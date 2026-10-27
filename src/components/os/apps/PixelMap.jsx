import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

import map from "./mapData.json";

// Map data: Natural Earth (public domain), rasterised to a Mercator pixel grid of the world.
// Each row is run-length encoded: "12." = 12 sea cells, "~" = lakes/rivers, letters = countries.
// Countries are map-coloured (neighbours never share a letter); lowercase letters are desert countries.
const decode = (rows) =>
  rows.map((row) => {
    const cells = [];
    row.replace(/(\d*)(.)/g, (_, count, cell) => {
      cells.push(...Array(Number(count || 1)).fill(cell));
      return "";
    });
    return cells;
  });

const WATER = "#a3ccff";
const LAND = "#f2efe9";
const DESERT = "#efe3c4";
const BORDER = "#b4aca0";
const COAST = "#e4ddd0";


const drawMap = (canvas) => {
  const grid = decode(map.rows);
  const ctx = canvas.getContext("2d");
  const isLand = (x, y) => grid[y]?.[x] && grid[y][x] !== "." && grid[y][x] !== "~";

  for (let y = 0; y < map.height; y += 1) {
    for (let x = 0; x < map.width; x += 1) {
      const cell = grid[y][x];
      let colour = WATER;
      if (isLand(x, y)) {
        colour = cell === cell.toLowerCase() ? DESERT : LAND;
        const right = grid[y][x + 1];
        const below = grid[y + 1]?.[x];
        const border = (isLand(x + 1, y) && right !== cell) || (isLand(x, y + 1) && below !== cell);
        // dashed country borders, like Google's
        if (border && (x + y) % 3 !== 0) {
          colour = BORDER;
        } else if (!isLand(x + 1, y) || !isLand(x - 1, y) || !isLand(x, y + 1) || !isLand(x, y - 1)) {
          colour = COAST;
        }
      }
      ctx.fillStyle = colour;
      ctx.fillRect(x, y, 1, 1);
    }
  }
};

// A classic red map pin, as pixel art
const pinRows = [
  "..KKKKK..",
  ".KRRRRRK.",
  "KRRRRRRRK",
  "KRRDDDRRK",
  "KRRDDDRRK",
  "KRRRRRRRK",
  ".KRRRRRK.",
  "..KRRRK..",
  "...KRK...",
  "....K....",
];
const pinColours = { K: "#8c1a10", R: "#ea4335", D: "#7a1209" };

const Pin = ({ selected }) => (
  <svg
    viewBox='0 0 9 10'
    shapeRendering='crispEdges'
    className={`drop-shadow-[0_2px_1px_rgba(0,0,0,0.35)] transition-transform ${selected ? "h-10 w-9" : "h-7 w-6"}`}
    aria-hidden='true'
  >
    {pinRows.flatMap((row, y) =>
      [...row].map((cell, x) => (pinColours[cell] ? <rect key={`${x}-${y}`} x={x} y={y} width='1' height='1' fill={pinColours[cell]} /> : null))
    )}
  </svg>
);

const ZOOMS = [1, 2, 4, 7];

const LON_SPAN = 360; // degrees of longitude the map covers
const KM_PER_DEGREE = 111.32;

const PixelMap = ({ places, selected, onSelect }) => {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const [zoomIndex, setZoomIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => drawMap(canvasRef.current), []);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setFrame({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  // At zoom 1 the whole world fits in the frame, then each step scales it up
  const aspect = map.width / map.height;
  const baseWidth = Math.min(frame.width, frame.height * aspect);
  const zoomLevel = ZOOMS[zoomIndex];
  const mapWidth = baseWidth * zoomLevel;
  const mapHeight = mapWidth / aspect;
  // Drag limits; when the map is smaller than the frame it stays centred
  const range = (frameSize, mapSize) =>
    mapSize > frameSize ? [frameSize - mapSize, 0] : [(frameSize - mapSize) / 2, (frameSize - mapSize) / 2];
  const [minX, maxX] = range(frame.width, mapWidth);
  const [minY, maxY] = range(frame.height, mapHeight);
  const bounds = { left: minX, right: maxX, top: minY, bottom: maxY };
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  // Pan so a point (in % of the map) sits in the middle of the frame
  const centreOn = (point) => {
    const options = reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 22 };
    animate(x, clamp(frame.width / 2 - (point.x / 100) * mapWidth, minX, maxX), options);
    animate(y, clamp(frame.height / 2 - (point.y / 100) * mapHeight, minY, maxY), options);
  };

  // Keep the selected place in view whenever the frame, zoom or selection changes
  const place = places.find(({ id }) => id === selected);
  useEffect(() => {
    if (frame.width) {
      centreOn(map.pins[place.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame.width, frame.height, zoomIndex, selected]);

  const zoom = (step) => setZoomIndex((index) => clamp(index + step, 0, ZOOMS.length - 1));

  // Scale bar: ground distance per pixel at ~45°N on this Mercator map
  const kmPerPixel = (LON_SPAN * KM_PER_DEGREE * Math.cos((45 * Math.PI) / 180)) / (mapWidth || 1);
  const scaleKm = [250, 500, 1000].find((km) => km / kmPerPixel >= 60) ?? 1000;

  // Flight route between the pins, as a curve in % of the map
  const [from, to] = places.map(({ id }) => map.pins[id]);
  const control = { x: (from.x + to.x) / 2 + 6, y: Math.min(from.y, to.y) + 4 };
  const routePath = `M${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;

  return (
    <div
      ref={frameRef}
      // focusing a pin near the edge would otherwise scroll this frame and shift the controls
      onScroll={(event) => event.currentTarget.scrollTo(0, 0)}
      className='relative h-full min-h-[280px] w-full touch-none overflow-hidden bg-[#a3ccff]'
    >
      <motion.div
        drag
        dragConstraints={bounds}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, y, width: mapWidth, height: mapHeight }}
        className='absolute left-0 top-0 cursor-grab active:cursor-grabbing'
      >
        <canvas
          ref={canvasRef}
          width={map.width}
          height={map.height}
          className='absolute inset-0 h-full w-full [image-rendering:pixelated]'
          aria-hidden='true'
        />

        {/* bigger countries are labelled first; smaller ones appear as you zoom in */}
        {map.countries
          .filter(({ size }) => size * (mapWidth / map.width) ** 2 > 2100)
          .map(({ name, x: left, y: top }) => (
          <span
            key={name}
            className='pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-label text-[9px] tracking-[0.2em] text-[#8c867b]'
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            {name}
          </span>
        ))}

        {mapWidth / map.width >= 3
          ? map.cities.map(({ name, x: left, y: top }) => (
              <span
                key={name}
                className='pointer-events-none absolute flex -translate-y-1/2 items-center gap-1 whitespace-nowrap text-[10px] text-[#5f5a52] [text-shadow:0_0_2px_#fff,0_0_2px_#fff]'
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span className='-ml-[3px] h-1.5 w-1.5 border border-[#5f5a52] bg-white' />
                {name}
              </span>
            ))
          : null}

        <svg viewBox='0 0 100 100' preserveAspectRatio='none' className='pointer-events-none absolute inset-0 h-full w-full' aria-hidden='true'>
          <path d={routePath} fill='none' stroke='#1a5fc9' strokeWidth='5' strokeLinecap='round' vectorEffect='non-scaling-stroke' />
          <path
            d={routePath}
            fill='none'
            stroke='#4285f4'
            strokeWidth='3'
            strokeDasharray='6 5'
            strokeLinecap='round'
            vectorEffect='non-scaling-stroke'
          />
        </svg>

        <Plane from={from} control={control} to={to} />

        {places.map(({ id, name }) => {
          const point = map.pins[id];
          return (
            <button
              key={id}
              type='button'
              aria-pressed={selected === id}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => {
                onSelect(id);
                // like Google: clicking a pin zooms in on it
                setZoomIndex((index) => Math.max(index, 2));
              }}
              className='absolute flex -translate-x-1/2 -translate-y-full flex-col items-center'
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <span
                className={`mb-1 whitespace-nowrap px-1.5 text-xs font-bold [text-shadow:0_0_3px_#fff,0_0_3px_#fff,0_0_3px_#fff] ${
                  selected === id ? "text-[#c5221f]" : "text-[#3c4043]"
                }`}
              >
                {name}
              </span>
              <Pin selected={selected === id} />
            </button>
          );
        })}
      </motion.div>

      {/* zoom controls */}
      <div className='absolute bottom-10 right-3 flex flex-col border-2 border-ink bg-white shadow-sticker'>
        <button
          type='button'
          aria-label='Zoom in'
          disabled={zoomIndex === ZOOMS.length - 1}
          onClick={() => zoom(1)}
          className='h-9 w-9 border-b-2 border-ink font-display text-xl font-bold hover:bg-[#f1f3f4] disabled:text-ink/30'
        >
          +
        </button>
        <button
          type='button'
          aria-label='Zoom out'
          disabled={zoomIndex === 0}
          onClick={() => zoom(-1)}
          className='h-9 w-9 font-display text-xl font-bold hover:bg-[#f1f3f4] disabled:text-ink/30'
        >
          −
        </button>
      </div>

      {/* scale bar + attribution */}
      <div className='pointer-events-none absolute bottom-2 left-2 flex items-end gap-2'>
        <span className='bg-white/80 px-1 text-[9px] text-[#5f5a52]'>Map data: Natural Earth</span>
      </div>
      <div className='pointer-events-none absolute bottom-2 right-3 flex flex-col items-end bg-white/80 px-1 text-[9px] text-[#3c4043]'>
        {scaleKm} km
        <span className='block h-1.5 border-x-2 border-b-2 border-[#3c4043]' style={{ width: scaleKm / kmPerPixel }} />
      </div>
    </div>
  );
};

const curve = (t, a, b, c) => (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;

const Plane = ({ from, control, to }) => {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0.5);

  useAnimationFrame((time) => {
    if (!reduceMotion) {
      // ease back and forth between the two cities every 7 seconds
      progress.set((1 - Math.cos((time / 7000) * Math.PI)) / 2);
    }
  });

  const left = useTransform(progress, (t) => `${curve(t, from.x, control.x, to.x)}%`);
  const top = useTransform(progress, (t) => `${curve(t, from.y, control.y, to.y)}%`);

  return (
    <motion.span
      aria-hidden='true'
      className='pointer-events-none absolute -ml-2.5 -mt-3 text-xl text-[#1a5fc9] [text-shadow:0_0_2px_#fff,0_0_2px_#fff]'
      style={{ left, top }}
    >
      ✈
    </motion.span>
  );
};

export default PixelMap;
