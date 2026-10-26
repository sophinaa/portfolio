import { useRef } from "react";
import { motion } from "framer-motion";

import { skills } from "../../../constants";

const SkillsApp = () => {
  const boardRef = useRef(null);
  const total = skills.reduce((count, { items }) => count + items.length, 0);

  return (
    <div className='flex h-full flex-col bg-white'>
      <div className='flex flex-wrap gap-4 border-b-2 border-ink bg-paper px-4 py-2 font-label text-[11px] uppercase'>
        {skills.map(({ category, color }) => (
          <span key={category} className='flex items-center gap-2'>
            <span className={`h-3 w-3 border-2 border-ink ${color}`} />
            {category}
          </span>
        ))}
        <span className='ml-auto normal-case text-ink/60'>drag them around ✦</span>
      </div>

      <div
        ref={boardRef}
        className='relative flex min-h-0 flex-1 flex-wrap content-center items-center justify-center gap-x-4 gap-y-5 overflow-hidden p-6'
      >
        {skills.flatMap(({ category, color, items }) =>
          items.map((item) => (
            <motion.span
              key={`${category}-${item}`}
              drag
              dragConstraints={boardRef}
              dragElastic={0.15}
              dragMomentum={false}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              whileHover={{ y: -3 }}
              whileDrag={{ scale: 1.15, zIndex: 20 }}
              className={`cursor-grab touch-none select-none border-2 border-ink px-3 py-1.5 font-display text-base font-semibold shadow-sticker active:cursor-grabbing sm:text-lg ${color}`}
            >
              {item}
            </motion.span>
          ))
        )}
      </div>

      <p className='border-t-2 border-ink bg-paper px-3 py-1 font-label text-[11px] uppercase'>{total} object(s)</p>
    </div>
  );
};

export default SkillsApp;
