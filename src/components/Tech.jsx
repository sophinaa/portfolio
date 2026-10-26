import { useRef } from "react";
import { motion } from "framer-motion";

import Section, { SectionHeading } from "./Section";
import { skills } from "../constants";

// Deterministic "random" tilt so the board looks hand-placed but stable between renders
const tiltFor = (text) => ((text.length * 7 + text.charCodeAt(0)) % 9) - 4;

const Tech = () => {
  const boardRef = useRef(null);

  return (
    <Section id='skills'>
      <SectionHeading
        kicker='Skills'
        title='my sticker collection.'
        note='go on, drag them around'
        squiggle='#8fdcb2'
      />

      <div className='mb-6 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest'>
        {skills.map(({ category, color }) => (
          <span key={category} className='flex items-center gap-2'>
            <span className={`h-4 w-4 rounded-full border-2 border-ink ${color}`} />
            {category}
          </span>
        ))}
      </div>

      <div
        ref={boardRef}
        className='paper-grid relative flex min-h-[420px] flex-wrap content-center items-center justify-center gap-x-6 gap-y-7 overflow-hidden rounded-[2rem] border-2 border-dashed border-ink/40 p-6 md:p-12'
      >
        {skills.flatMap(({ category, color, items }) =>
          items.map((item) => (
            <motion.span
              key={`${category}-${item}`}
              drag
              dragConstraints={boardRef}
              dragElastic={0.15}
              dragMomentum={false}
              style={{ rotate: tiltFor(item) }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.2, rotate: 0, zIndex: 20 }}
              className={`cursor-grab touch-none select-none rounded-full border-2 border-ink px-5 py-2.5 font-display text-lg shadow-sticker active:cursor-grabbing md:text-xl ${color}`}
            >
              {item}
            </motion.span>
          ))
        )}
      </div>
    </Section>
  );
};

export default Tech;
