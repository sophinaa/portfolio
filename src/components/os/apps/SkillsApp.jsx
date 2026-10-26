import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { skills } from "../../../constants";

// On touch screens a finger on a tile should scroll the board, not drag the tile
const isTouch = () => window.matchMedia("(pointer: coarse)").matches;

const SkillsApp = () => {
  const boardRef = useRef(null);
  const [draggable] = useState(() => !isTouch());
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
        <span className='ml-auto normal-case text-ink/60'>{draggable ? "drag them around ✦" : "scroll for more ✦"}</span>
      </div>

      <div
        ref={boardRef}
        className='relative flex min-h-0 flex-1 flex-wrap content-start items-center justify-center gap-x-4 gap-y-5 overflow-y-auto p-6'
      >
        {skills.flatMap(({ category, color, items }) =>
          items.map((item) => (
            <motion.span
              key={`${category}-${item}`}
              drag={draggable}
              dragConstraints={boardRef}
              dragElastic={0.15}
              dragMomentum={false}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              whileHover={{ y: -3 }}
              whileDrag={{ scale: 1.15, zIndex: 20 }}
              className={`${draggable ? "cursor-grab touch-none active:cursor-grabbing" : ""} select-none border-2 border-ink px-3 py-1.5 font-display text-base font-semibold shadow-sticker sm:text-lg ${color}`}
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
