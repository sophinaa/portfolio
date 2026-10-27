import { useEffect, useState } from "react";
import PixelMap from "./PixelMap";

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
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    timeZone: "Africa/Cairo",
    Scene: CairoScene,
    blurb: "Where I'm from, and why I'm fluent in Arabic.",
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

const MapsApp = () => {
  const [selected, setSelected] = useState(places[0].id);
  const place = places.find(({ id }) => id === selected);

  return (
    <div className='flex h-full flex-col bg-paper'>
      {/* Google-style search box */}
      <div className='border-b-2 border-ink p-2'>
        <div className='bevel-in flex items-center gap-2 px-3 py-1.5 font-sans text-xs'>
          <span aria-hidden='true'>⌕</span>
          <span className='truncate'>
            St Andrews, Scotland <span className='text-[#4285f4]'>✈</span> Cairo, Egypt
          </span>
          <span className='ml-auto shrink-0 font-label text-[10px] uppercase text-ink/60'>~3,950 km</span>
        </div>
      </div>

      <div className='grid min-h-0 flex-1 overflow-auto md:grid-cols-[1.25fr_1fr]'>
        <div className='h-[300px] border-b-2 border-ink md:h-auto md:border-b-0 md:border-r-2'>
          <PixelMap places={places} selected={selected} onSelect={setSelected} />
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
