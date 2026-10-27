import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
const BORDER = "#a69e92";
const COAST = "#ddd4c3";

// Each map cell is drawn as SCALE×SCALE canvas pixels, so borders can be thin lines on the cell edges
const SCALE = 4;

const drawMap = (canvas) => {
  const grid = decode(map.rows);
  const ctx = canvas.getContext("2d");
  const isLand = (x, y) => {
    const cell = grid[y]?.[x];
    return Boolean(cell) && cell !== "." && cell !== "~";
  };

  for (let y = 0; y < map.height; y += 1) {
    for (let x = 0; x < map.width; x += 1) {
      const cell = grid[y][x];
      ctx.fillStyle = !isLand(x, y) ? WATER : cell === cell.toLowerCase() ? DESERT : LAND;
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }
  }

  for (let y = 0; y < map.height; y += 1) {
    for (let x = 0; x < map.width; x += 1) {
      if (!isLand(x, y)) {
        continue;
      }
      const cell = grid[y][x];
      const px = x * SCALE;
      const py = y * SCALE;

      // soft coastline on the land side
      ctx.fillStyle = COAST;
      if (!isLand(x + 1, y)) ctx.fillRect(px + SCALE - 1, py, 1, SCALE);
      if (!isLand(x - 1, y)) ctx.fillRect(px, py, 1, SCALE);
      if (!isLand(x, y + 1)) ctx.fillRect(px, py + SCALE - 1, SCALE, 1);
      if (!isLand(x, y - 1)) ctx.fillRect(px, py, SCALE, 1);

      // dashed country borders along cell edges, like Google's
      ctx.fillStyle = BORDER;
      if (isLand(x + 1, y) && grid[y][x + 1] !== cell && y % 2 === 0) {
        ctx.fillRect(px + SCALE - 1, py, 1, SCALE);
      }
      if (isLand(x, y + 1) && grid[y + 1][x] !== cell && x % 2 === 0) {
        ctx.fillRect(px, py + SCALE - 1, SCALE, 1);
      }
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
    className={`drop-shadow-[0_2px_1px_rgba(0,0,0,0.35)] transition-all duration-200 ${selected ? "h-10 w-9" : "h-7 w-6"}`}
    aria-hidden='true'
  >
    {pinRows.flatMap((row, y) =>
      [...row].map((cell, x) => (pinColours[cell] ? <rect key={`${x}-${y}`} x={x} y={y} width='1' height='1' fill={pinColours[cell]} /> : null))
    )}
  </svg>
);

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const PIN_ZOOM = 4;

const LON_SPAN = 360; // degrees of longitude the map covers
const KM_PER_DEGREE = 111.32;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const PixelMap = ({ places, selected, onSelect }) => {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  // `zoom` drives the animation; `zoomLevel` is a React copy for labels, drag limits and the scale bar
  const zoom = useMotionValue(MIN_ZOOM);
  const [zoomLevel, setZoomLevel] = useState(MIN_ZOOM);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => drawMap(canvasRef.current), []);
  useEffect(() => zoom.on("change", setZoomLevel), [zoom]);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setFrame({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  // At zoom 1 the whole world fits the frame
  const aspect = map.width / map.height;
  const baseWidth = Math.min(frame.width, frame.height * aspect) || 1;
  // the frame size can change (resizing, maximising), so it's a motion value too
  const base = useMotionValue(baseWidth);
  useLayoutEffect(() => base.set(baseWidth), [base, baseWidth]);
  const width = useTransform([zoom, base], ([level, size]) => size * level);
  const height = useTransform([zoom, base], ([level, size]) => (size * level) / aspect);

  // Pan limits for a given zoom; a map smaller than the frame stays centred
  const limits = useCallback(
    (level) => {
      const range = (frameSize, mapSize) =>
        mapSize > frameSize ? [frameSize - mapSize, 0] : [(frameSize - mapSize) / 2, (frameSize - mapSize) / 2];
      const mapWidth = baseWidth * level;
      const [minX, maxX] = range(frame.width, mapWidth);
      const [minY, maxY] = range(frame.height, mapWidth / aspect);
      return { minX, maxX, minY, maxY };
    },
    [baseWidth, frame.width, frame.height, aspect]
  );

  // Zoom to `target`, keeping the map point under `anchor` (frame pixels) fixed, or
  // bringing `focus` (a map point in %) to the middle of the frame
  const zoomTo = useCallback(
    (target, { anchor, focus, instant } = {}) => {
      const level = clamp(target, MIN_ZOOM, MAX_ZOOM);
      const oldWidth = baseWidth * zoom.get();
      const newWidth = baseWidth * level;
      const newHeight = newWidth / aspect;
      let nextX;
      let nextY;
      if (focus) {
        nextX = frame.width / 2 - (focus.x / 100) * newWidth;
        nextY = frame.height / 2 - (focus.y / 100) * newHeight;
      } else {
        const point = anchor ?? { x: frame.width / 2, y: frame.height / 2 };
        const ratio = newWidth / oldWidth;
        nextX = point.x - (point.x - x.get()) * ratio;
        nextY = point.y - (point.y - y.get()) * ratio;
      }
      const { minX, maxX, minY, maxY } = limits(level);
      nextX = clamp(nextX, minX, maxX);
      nextY = clamp(nextY, minY, maxY);

      if (instant || reduceMotion) {
        zoom.set(level);
        x.set(nextX);
        y.set(nextY);
        return;
      }
      const options = { type: "spring", stiffness: 170, damping: 26 };
      animate(zoom, level, options);
      animate(x, nextX, options);
      animate(y, nextY, options);
    },
    [aspect, baseWidth, frame.width, frame.height, limits, reduceMotion, x, y, zoom]
  );

  // Keep the map in bounds whenever the frame changes size
  useEffect(() => {
    if (frame.width) {
      zoomTo(zoom.get(), { instant: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame.width, frame.height]);

  // Mouse wheel / trackpad pinch zooms towards the cursor
  useEffect(() => {
    const element = frameRef.current;
    const onWheel = (event) => {
      event.preventDefault();
      const rect = element.getBoundingClientRect();
      const factor = Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.0025));
      zoomTo(zoom.get() * factor, { anchor: { x: event.clientX - rect.left, y: event.clientY - rect.top }, instant: true });
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [zoom, zoomTo]);

  const onDoubleClick = (event) => {
    const rect = frameRef.current.getBoundingClientRect();
    zoomTo(zoom.get() * 2, { anchor: { x: event.clientX - rect.left, y: event.clientY - rect.top } });
  };

  const { minX, maxX, minY, maxY } = limits(zoomLevel);
  const mapWidth = baseWidth * zoomLevel;
  const pixelsPerCell = mapWidth / map.width;

  // Scale bar: ground distance per screen pixel at ~45°N on this Mercator map
  const kmPerPixel = (LON_SPAN * KM_PER_DEGREE * Math.cos((45 * Math.PI) / 180)) / mapWidth;
  const scaleKm = [100, 250, 500, 1000, 2000, 5000].find((km) => km / kmPerPixel >= 60) ?? 5000;

  // Flight route between the pins, as a curve in % of the map
  const [from, to] = places.map(({ id }) => map.pins[id]);
  const control = { x: (from.x + to.x) / 2 + 6, y: Math.min(from.y, to.y) + 4 };
  const routePath = `M${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;

  const stop = (event) => event.stopPropagation();

  return (
    <div
      ref={frameRef}
      // focusing a pin near the edge would otherwise scroll this frame and shift the controls
      onScroll={(event) => event.currentTarget.scrollTo(0, 0)}
      onDoubleClick={onDoubleClick}
      className='relative h-full min-h-[280px] w-full touch-none select-none overflow-hidden bg-[#a3ccff]'
    >
      <motion.div
        drag
        dragConstraints={{ left: minX, right: maxX, top: minY, bottom: maxY }}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, y, width, height }}
        className='absolute left-0 top-0 cursor-grab active:cursor-grabbing'
      >
        <canvas
          ref={canvasRef}
          width={map.width * SCALE}
          height={map.height * SCALE}
          // smooth when shrunk (so thin borders don't flicker), crisp pixels when zoomed in
          style={{ imageRendering: pixelsPerCell >= SCALE ? "pixelated" : "auto" }}
          className='absolute inset-0 h-full w-full'
          aria-hidden='true'
        />

        {/* bigger countries are labelled first; smaller ones fade in as you zoom */}
        {map.countries.map(({ name, size, x: left, y: top }) => (
          <span
            key={name}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-label text-[9px] tracking-[0.2em] text-[#8c867b] transition-opacity duration-300 ${
              size * pixelsPerCell ** 2 > 2100 ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            {name}
          </span>
        ))}

        {map.cities.map(({ name, x: left, y: top }) => (
          <span
            key={name}
            className={`pointer-events-none absolute flex -translate-y-1/2 items-center gap-1 whitespace-nowrap text-[10px] text-[#5f5a52] transition-opacity duration-300 [text-shadow:0_0_2px_#fff,0_0_2px_#fff] ${
              pixelsPerCell >= 4.5 ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span className='-ml-[3px] h-1.5 w-1.5 border border-[#5f5a52] bg-white' />
            {name}
          </span>
        ))}

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
              onPointerDown={stop}
              onDoubleClick={stop}
              onClick={() => {
                onSelect(id);
                // like Google: clicking a pin flies to it
                zoomTo(Math.max(zoom.get(), PIN_ZOOM), { focus: point });
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

      {/* zoom controls, Google style */}
      <div
        className='absolute bottom-10 right-3 flex flex-col overflow-hidden border-2 border-ink bg-white shadow-sticker'
        onDoubleClick={stop}
      >
        <button
          type='button'
          aria-label='Zoom in'
          disabled={zoomLevel >= MAX_ZOOM - 0.01}
          onClick={() => zoomTo(zoom.get() * 2)}
          className='flex h-9 w-9 items-center justify-center font-display text-xl font-bold text-[#3c4043] hover:bg-[#f1f3f4] active:bg-[#e8eaed] disabled:text-[#3c4043]/30 disabled:hover:bg-white'
        >
          +
        </button>
        <span className='mx-1.5 h-0.5 bg-[#dadce0]' aria-hidden='true' />
        <button
          type='button'
          aria-label='Zoom out'
          disabled={zoomLevel <= MIN_ZOOM + 0.01}
          onClick={() => zoomTo(zoom.get() / 2)}
          className='flex h-9 w-9 items-center justify-center font-display text-xl font-bold text-[#3c4043] hover:bg-[#f1f3f4] active:bg-[#e8eaed] disabled:text-[#3c4043]/30 disabled:hover:bg-white'
        >
          −
        </button>
      </div>

      <button
        type='button'
        onClick={() => zoomTo(MIN_ZOOM)}
        onDoubleClick={stop}
        disabled={zoomLevel <= MIN_ZOOM + 0.01}
        className='absolute right-3 top-3 border-2 border-ink bg-white px-2 py-1 font-label text-[10px] uppercase text-[#3c4043] shadow-sticker transition-opacity hover:bg-[#f1f3f4] disabled:pointer-events-none disabled:opacity-0'
      >
        ⤢ Whole world
      </button>

      {/* attribution + scale bar */}
      <span className='pointer-events-none absolute bottom-2 left-2 bg-white/80 px-1 text-[9px] text-[#5f5a52]'>
        Map data: Natural Earth
      </span>
      <div className='pointer-events-none absolute bottom-2 right-3 flex flex-col items-end bg-white/80 px-1 text-[9px] text-[#3c4043]'>
        {scaleKm.toLocaleString()} km
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
