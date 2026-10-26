import { motion } from "framer-motion";

// Little animated illustrations standing in for project screenshots

const Bars = () => {
  const heights = [40, 72, 55, 90, 64, 82, 48];

  return (
    <div className='flex h-full flex-col justify-between rounded-2xl border-2 border-ink bg-paper p-5'>
      <div className='flex items-center justify-between font-label text-[10px] uppercase tracking-widest'>
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
      <div className='flex gap-2 font-label text-[10px] uppercase'>
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
    <div className='mx-auto h-full max-w-[220px] border-2 border-ink bg-ink p-2'>
      <div className='relative h-full min-h-[260px] overflow-hidden bg-mint'>
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
          <p className='font-label text-[10px]'>★★★★☆ · 0.3 mi</p>
        </div>
      </div>
    </div>
  );
};

const Laps = () => (
  <div className='flex h-full flex-col justify-between rounded-2xl border-2 border-ink bg-ink p-5 text-paper'>
    <div className='flex items-center justify-between font-label text-[10px] uppercase tracking-widest'>
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
    <div className='flex gap-4 font-label text-[10px] uppercase'>
      <span className='flex items-center gap-1.5'><span className='h-2 w-4 rounded bg-lime' /> soft</span>
      <span className='flex items-center gap-1.5'><span className='h-2 w-4 rounded bg-lilac' /> medium</span>
    </div>
  </div>
);

const Chat = () => (
  <div className='flex h-full flex-col gap-2 rounded-2xl border-2 border-ink bg-paper p-4 text-xs'>
    <span className='font-label text-[10px] uppercase tracking-widest'>campus companion</span>
    {[
      { me: true, text: "how do I revise for databases?" },
      { me: false, text: "Start with normalisation, then try these 3 practice questions…" },
      { me: true, text: "quiz me!" },
    ].map(({ me, text }, index) => (
      <motion.p
        key={text}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.5 }}
        className={`max-w-[80%] rounded-xl border-2 border-ink px-3 py-1.5 ${me ? "self-end bg-lilac" : "self-start bg-white"}`}
      >
        {text}
      </motion.p>
    ))}
    <span className='mt-auto self-start rounded-xl border-2 border-ink bg-white px-3 py-1'>
      <span className='blink'>● ● ●</span>
    </span>
  </div>
);

const Auth = () => (
  <div className='crt flex h-full flex-col justify-center gap-2 rounded-2xl border-2 border-ink p-5 font-term text-lg text-lime'>
    <p>&gt; GET /secret</p>
    <p className='text-tomato'>401 WWW-Authenticate: Digest</p>
    <p>&gt; response=sha256(HA1:nonce:HA2)</p>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
    >
      200 OK ✓
    </motion.p>
  </div>
);

const nodes = [
  { x: 30, y: 30 },
  { x: 110, y: 20 },
  { x: 70, y: 80 },
  { x: 170, y: 70 },
  { x: 130, y: 125 },
  { x: 220, y: 120 },
];
const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5]];
const shortest = [[0, 2], [2, 4], [4, 5]];

const Graph = () => (
  <div className='flex h-full items-center justify-center rounded-2xl border-2 border-ink bg-paper p-4'>
    <svg viewBox='0 0 250 150' className='h-full w-full' aria-hidden='true'>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke='#0b0b0b' strokeWidth='2' opacity='0.3' />
      ))}
      {shortest.map(([a, b], index) => (
        <motion.line
          key={`path-${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke='#ff4f8b'
          strokeWidth='4'
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ delay: index * 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}
      {nodes.map(({ x, y }, index) => (
        <rect key={index} x={x - 7} y={y - 7} width='14' height='14' fill={index === 0 || index === 5 ? "#ffd23f" : "#ffffff"} stroke='#0b0b0b' strokeWidth='2' />
      ))}
    </svg>
  </div>
);

const Gantt = () => {
  const rows = [
    { label: "RR", blocks: [["P1", 3, "bg-lilac"], ["P2", 3, "bg-mint"], ["P3", 3, "bg-butter"], ["P1", 3, "bg-lilac"], ["P3", 2, "bg-butter"]] },
    { label: "STCF", blocks: [["P2", 3, "bg-mint"], ["P3", 5, "bg-butter"], ["P1", 6, "bg-lilac"]] },
  ];

  return (
    <div className='flex h-full flex-col justify-center gap-4 rounded-2xl border-2 border-ink bg-paper p-5'>
      {rows.map(({ label, blocks }) => (
        <div key={label}>
          <p className='mb-1 font-label text-[10px] uppercase'>{label}</p>
          <div className='flex h-9'>
            {blocks.map(([name, length, color], index) => (
              <motion.span
                key={index}
                className={`flex items-center justify-center border-2 border-ink font-label text-[10px] ${color}`}
                style={{ flexGrow: length }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.25 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Console = ({ project }) => (
  <div className='crt flex h-full flex-col justify-center gap-1 rounded-2xl border-2 border-ink p-5 font-term text-lg text-lime'>
    <p>&gt; java {project.name.replace(/\s+/g, "")}</p>
    <p>{project.year} · {project.tags.join(" · ")}</p>
    <p>&gt; loading…</p>
    <p>
      &gt; <span className='blink'>█</span>
    </p>
  </div>
);

const Plan = () => (
  <div className='flex h-full flex-col gap-2 rounded-2xl border-2 border-ink bg-paper p-4 text-xs'>
    <span className='font-label text-[10px] uppercase tracking-widest'>your best three</span>
    {[
      ["Universal Credit", "£8.9k", "bg-lime"],
      ["Scottish Child Payment", "£1.0k", "bg-lilac"],
      ["Single person discount", "£320", "bg-mint"],
    ].map(([name, value, color], index) => (
      <motion.div
        key={name}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.4 }}
        className='flex items-center gap-3 border-2 border-ink bg-white px-3 py-2'
      >
        <span className={`flex h-6 w-6 items-center justify-center border-2 border-ink font-label ${color}`}>{index + 1}</span>
        <span className='flex-1'>{name}</span>
        <span className='font-label'>{value}</span>
      </motion.div>
    ))}
    <span className='mt-auto text-[10px] text-ink/60'>picked from 15 combinations · sample data</span>
  </div>
);

const arts = { plan: Plan, bars: Bars, map: MapPins, laps: Laps, chat: Chat, auth: Auth, graph: Graph, gantt: Gantt, console: Console };

const ProjectArt = ({ kind, project }) => {
  const Art = arts[kind];
  return Art ? <Art project={project} /> : null;
};

export default ProjectArt;
