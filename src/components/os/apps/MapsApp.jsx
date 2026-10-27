import { useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

// Pixel scenes are drawn on a 48×24 grid with crisp rects
const Scene = ({ children, sky }) => (
  <svg viewBox='0 0 48 24' shapeRendering='crispEdges' className='block w-full border-2 border-ink' aria-hidden='true'>
    <rect width='48' height='24' fill={sky} />
    {children}
  </svg>
);

const StAndrewsScene = () => (
  <Scene sky='#8dbcf5'>
    <rect x='36' y='3' width='4' height='4' fill='#fff6d8' />
    {/* sea */}
    <rect y='16' width='48' height='8' fill='#3574e0' />
    <rect x='4' y='18' width='6' height='1' fill='#8dbcf5' />
    <rect x='24' y='20' width='8' height='1' fill='#8dbcf5' />
    {/* cliffs + grass */}
    <rect y='14' width='30' height='3' fill='#6aa634' />
    <rect y='17' width='26' height='2' fill='#8a8474' />
    {/* cathedral ruins: two towers and a broken wall */}
    <rect x='6' y='4' width='3' height='10' fill='#c3b79a' />
    <rect x='13' y='4' width='3' height='10' fill='#c3b79a' />
    <rect x='9' y='9' width='4' height='5' fill='#c3b79a' />
    <rect x='10' y='10' width='2' height='3' fill='#8dbcf5' />
    <rect x='7' y='6' width='1' height='2' fill='#5a5246' />
    <rect x='14' y='6' width='1' height='2' fill='#5a5246' />
    <rect x='17' y='10' width='2' height='4' fill='#c3b79a' />
    <rect x='20' y='12' width='2' height='2' fill='#c3b79a' />
    {/* golf flag */}
    <rect x='26' y='9' width='1' height='5' fill='#0b0b0b' />
    <rect x='27' y='9' width='3' height='2' fill='#ff4f8b' />
  </Scene>
);

const CairoScene = () => (
  <Scene sky='#ffcf7a'>
    <rect x='38' y='3' width='5' height='5' fill='#fff1b8' />
    {/* sand */}
    <rect y='15' width='48' height='9' fill='#e8c27a' />
    {/* the Nile */}
    <rect y='20' width='48' height='2' fill='#3574e0' />
    {/* pyramids, built as stepped rows */}
    {[
      { x: 6, size: 9 },
      { x: 20, size: 7 },
      { x: 31, size: 5 },
    ].flatMap(({ x, size }) =>
      Array.from({ length: size }, (_, row) => (
        <rect
          key={`${x}-${row}`}
          x={x + size - row - 1}
          y={15 - size + row}
          width={(row + 1) * 2}
          height='1'
          fill={row % 2 ? "#c99a52" : "#d9ac63"}
        />
      ))
    )}
    {/* palm */}
    <rect x='43' y='11' width='1' height='4' fill='#7a5230' />
    <rect x='41' y='10' width='5' height='1' fill='#4f9a3a' />
    <rect x='42' y='9' width='3' height='1' fill='#4f9a3a' />
  </Scene>
);

const places = [
  {
    id: "standrews",
    name: "St Andrews",
    country: "Scotland",
    timeZone: "Europe/London",
    Scene: StAndrewsScene,
    blurb: "Home. I went to Madras College here and worked at the University of St Andrews.",
    pin: { left: "22%", top: "16%" },
    color: "bg-lilac",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    timeZone: "Africa/Cairo",
    Scene: CairoScene,
    blurb: "Where I'm from, and why I'm fluent in Arabic.",
    pin: { left: "74%", top: "74%" },
    color: "bg-butter",
  },
];

const LocalTime = ({ timeZone }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone });
};

// Point on the flight path's quadratic curve (same numbers as the dashed SVG path), in %
const START = [22, 16];
const CONTROL = [58, 10];
const END = [74, 74];
const curve = (t, axis) => (1 - t) ** 2 * START[axis] + 2 * (1 - t) * t * CONTROL[axis] + t ** 2 * END[axis];

const Plane = () => {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0.5);

  useAnimationFrame((time) => {
    if (!reduceMotion) {
      // ease back and forth between the two cities every 6 seconds
      progress.set((1 - Math.cos((time / 6000) * Math.PI)) / 2);
    }
  });

  const left = useTransform(progress, (t) => `${curve(t, 0)}%`);
  const top = useTransform(progress, (t) => `${curve(t, 1)}%`);

  return (
    <motion.span aria-hidden='true' className='absolute -ml-3 -mt-3 text-2xl text-white [text-shadow:1px_1px_0_#0b0b0b]' style={{ left, top }}>
      ✈
    </motion.span>
  );
};

const MapsApp = () => {
  const [selected, setSelected] = useState(places[0].id);
  const place = places.find(({ id }) => id === selected);

  return (
    <div className='flex h-full flex-col bg-paper'>
      <div className='flex items-center gap-2 border-b-2 border-ink px-3 py-2 font-label text-[11px] uppercase'>
        <span>Route</span>
        <span className='bevel-in flex-1 truncate px-2 py-1 font-sans text-xs normal-case'>
          St Andrews, Scotland ⇄ Cairo, Egypt · ~3,950 km
        </span>
      </div>

      <div className='grid min-h-0 flex-1 overflow-auto md:grid-cols-[1.2fr_1fr]'>
        {/* the map */}
        <div className='relative min-h-[260px] overflow-hidden border-b-2 border-ink bg-[#3574e0] md:border-b-0 md:border-r-2'>
          <div
            className='absolute inset-0 opacity-30'
            style={{ backgroundImage: "radial-gradient(#8dbcf5 1px, transparent 1.2px)", backgroundSize: "8px 8px" }}
            aria-hidden='true'
          />
          {/* blocky land masses: Britain at the top left, North Africa at the bottom */}
          <svg viewBox='0 0 40 30' shapeRendering='crispEdges' preserveAspectRatio='none' className='absolute inset-0 h-full w-full' aria-hidden='true'>
            <path d='M5 2h3v2h1v3h-1v2h2v3h-1v2h-4v-2h1v-2h-2v-3h1v-2h-1v-2h1z' fill='#6aa634' />
            <path d='M2 6h2v3h-2z' fill='#6aa634' />
            <path d='M14 6h10v2h4v3h-3v2h-3v-2h-4v2h-3v-3h-1z' fill='#86bd42' />
            <path d='M0 21h12v-2h6v2h6v-1h8v2h8v8h-40z' fill='#e8c27a' />
            <path d='M29 21h1v9h-1z' fill='#3574e0' />
          </svg>

          <svg viewBox='0 0 100 100' preserveAspectRatio='none' className='absolute inset-0 h-full w-full' aria-hidden='true'>
            <path
              d={`M${START} Q ${CONTROL} ${END}`}
              fill='none'
              stroke='#ffffff'
              strokeWidth='0.8'
              strokeDasharray='2 2'
              vectorEffect='non-scaling-stroke'
            />
          </svg>
          <Plane />

          {places.map(({ id, name, pin, color }) => (
            <button
              key={id}
              type='button'
              aria-pressed={selected === id}
              onClick={() => setSelected(id)}
              className='group absolute flex -translate-x-1/2 -translate-y-4 flex-col items-center'
              style={pin}
            >
              <motion.span
                className={`block h-7 w-7 rotate-45 border-2 border-ink shadow-sticker ${color} ${selected === id ? "" : "opacity-80"}`}
                animate={selected === id ? { y: [0, -6, 0] } : { y: 0 }}
                transition={{ duration: 1.2, repeat: selected === id ? Infinity : 0 }}
              />
              <span
                className={`mt-2 block whitespace-nowrap border-2 border-ink px-2 py-0.5 font-label text-[10px] uppercase ${
                  selected === id ? "bg-navy text-white" : "bg-paper group-hover:bg-butter"
                }`}
              >
                {name}
              </span>
            </button>
          ))}

          <span className='absolute bottom-2 right-2 bg-paper/90 px-1.5 font-label text-[9px] uppercase'>not to scale ✦</span>
        </div>

        {/* the selected place */}
        <article className='p-5'>
          <place.Scene />
          <h2 className='mt-4 font-display text-4xl font-bold leading-none'>{place.name}</h2>
          <p className='font-label text-[11px] uppercase text-ink/60'>{place.country}</p>
          <p className='mt-3 leading-relaxed'>{place.blurb}</p>
          <p className='crt mt-4 inline-block border-2 border-ink px-3 py-1.5 font-term text-xl text-lime'>
            local time &gt; <LocalTime timeZone={place.timeZone} />
          </p>
        </article>
      </div>
    </div>
  );
};

export default MapsApp;
