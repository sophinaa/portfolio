import { motion } from "framer-motion";

// Little animated illustrations standing in for project screenshots

const Bars = () => {
  const heights = [40, 72, 55, 90, 64, 82, 48];

  return (
    <div className='flex h-full flex-col justify-between rounded-2xl border-2 border-ink bg-paper p-5'>
      <div className='flex items-center justify-between font-mono text-[10px] uppercase tracking-widest'>
        <span>events / sec</span>
        <span className='flex items-center gap-1.5'>
          <span className='h-2 w-2 animate-pulse rounded-full bg-tomato' /> live
        </span>
      </div>
      <div className='flex h-40 items-end gap-2'>
        {heights.map((height, index) => (
          <motion.div
            key={index}
            className='flex-1 rounded-t-md border-2 border-ink bg-lilac'
            initial={{ height: "10%" }}
            whileInView={{ height: [`${height}%`, `${Math.max(20, height - 30)}%`, `${height}%`] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className='flex gap-2 font-mono text-[10px] uppercase'>
        <span className='rounded-full border-2 border-ink bg-mint px-2 py-0.5'>gateway ok</span>
        <span className='rounded-full border-2 border-ink bg-butter px-2 py-0.5'>jwt ✓</span>
      </div>
    </div>
  );
};

const MapPins = () => {
  const pins = [
    { left: "22%", top: "30%", color: "bg-tomato" },
    { left: "60%", top: "22%", color: "bg-lilac" },
    { left: "45%", top: "58%", color: "bg-tomato" },
    { left: "75%", top: "62%", color: "bg-butter" },
  ];

  return (
    <div className='mx-auto h-full max-w-[220px] rounded-[2rem] border-2 border-ink bg-ink p-2'>
      <div className='relative h-full min-h-[260px] overflow-hidden rounded-[1.6rem] bg-mint'>
        <svg className='absolute inset-0 h-full w-full' viewBox='0 0 200 300' preserveAspectRatio='none' aria-hidden='true'>
          <path d='M-10 80 Q 80 120 210 60' stroke='#f4efe4' strokeWidth='14' fill='none' />
          <path d='M60 -10 Q 90 150 40 310' stroke='#f4efe4' strokeWidth='10' fill='none' />
          <path d='M-10 220 Q 120 180 210 250' stroke='#f4efe4' strokeWidth='12' fill='none' />
        </svg>
        {pins.map((pin, index) => (
          <motion.span
            key={index}
            className={`absolute h-6 w-6 -translate-x-1/2 rounded-full rounded-br-none border-2 border-ink ${pin.color}`}
            style={{ left: pin.left, top: pin.top, rotate: 45 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.3 }}
          />
        ))}
        <div className='absolute inset-x-3 bottom-3 rounded-xl border-2 border-ink bg-paper p-2.5 text-ink'>
          <p className='text-xs font-bold'>Nearby spot</p>
          <p className='font-mono text-[10px]'>★★★★☆ · 0.3 mi</p>
        </div>
      </div>
    </div>
  );
};

const Laps = () => (
  <div className='flex h-full flex-col justify-between rounded-2xl border-2 border-ink bg-ink p-5 text-paper'>
    <div className='flex items-center justify-between font-mono text-[10px] uppercase tracking-widest'>
      <span>lap 23 vs lap 24</span>
      <span className='text-lime'>-0.214s</span>
    </div>
    <svg viewBox='0 0 300 140' className='my-4 w-full' fill='none' aria-hidden='true'>
      {[
        { d: "M0 110 C 40 20, 70 20, 100 70 S 160 130, 200 50 S 260 10, 300 40", color: "#d8f650" },
        { d: "M0 115 C 45 35, 75 30, 105 80 S 165 125, 205 62 S 262 25, 300 52", color: "#a99bff" },
      ].map(({ d, color }, index) => (
        <motion.path
          key={color}
          d={d}
          stroke={color}
          strokeWidth='3.5'
          strokeLinecap='round'
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, delay: index * 0.4, repeat: Infinity, repeatDelay: 1.5 }}
        />
      ))}
    </svg>
    <div className='flex gap-4 font-mono text-[10px] uppercase'>
      <span className='flex items-center gap-1.5'><span className='h-2 w-4 rounded bg-lime' /> soft</span>
      <span className='flex items-center gap-1.5'><span className='h-2 w-4 rounded bg-lilac' /> medium</span>
    </div>
  </div>
);

const arts = { bars: Bars, map: MapPins, laps: Laps };

const ProjectArt = ({ kind }) => {
  const Art = arts[kind];
  return Art ? <Art /> : null;
};

export default ProjectArt;
