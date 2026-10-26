import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Section, { SectionHeading } from "./Section";
import { experiences } from "../constants";

const filters = [
  { id: "all", label: "Everything" },
  { id: "work", label: "Work" },
  { id: "leadership", label: "Leadership" },
];

const pinColors = ["bg-tomato", "bg-lilac", "bg-mint", "bg-butter"];
const tilts = [-1.5, 1, -0.5, 1.5, -1, 0.5];

const ExperienceCard = ({ item, index }) => (
  <motion.li
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1, rotate: tilts[index % tilts.length] }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ rotate: 0, y: -6 }}
    transition={{ type: "spring", bounce: 0.35 }}
    className='relative rounded-2xl border-2 border-ink bg-paper p-6 shadow-sticker'
  >
    <span
      className={`absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-ink ${
        pinColors[index % pinColors.length]
      }`}
    />

    <div className='flex items-center gap-4'>
      <div className='flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-white'>
        {item.icon ? (
          <img src={item.icon} alt='' className='h-full w-full object-cover' />
        ) : (
          <span className='font-display text-xl'>✎</span>
        )}
      </div>
      <div>
        <p className='font-mono text-[11px] uppercase tracking-widest text-ink/60'>{item.date}</p>
        <h3 className='text-lg font-bold leading-tight'>{item.role}</h3>
      </div>
    </div>

    <p className='mt-4 font-hand text-2xl leading-6 text-tomato'>{item.org}</p>
    <p className='mt-2 text-[15px] leading-relaxed text-ink/80'>{item.line}</p>
  </motion.li>
);

const Experience = () => {
  const [filter, setFilter] = useState("all");
  const shown = experiences.filter((item) => filter === "all" || item.kind === filter);

  return (
    <Section id='experience'>
      <SectionHeading kicker='Experience' title='where i’ve been.' squiggle='#a99bff' />

      <div className='mb-10 flex flex-wrap gap-2' role='group' aria-label='Filter experience'>
        {filters.map(({ id, label }) => (
          <button
            key={id}
            type='button'
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={`rounded-full border-2 border-ink px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
              filter === id ? "bg-ink text-paper shadow-none" : "bg-paper shadow-sticker hover:-translate-y-0.5"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.ul layout className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        <AnimatePresence mode='popLayout'>
          {shown.map((item, index) => (
            <ExperienceCard key={`${item.org}-${item.role}`} item={item} index={index} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
};

export default Experience;
