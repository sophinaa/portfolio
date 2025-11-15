import React from "react";
import Tilt from "react-tilt";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechCard = ({ category, items, index }) => (
  <Tilt className='w-full'>
    <div
      className='green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className='bg-tertiary rounded-[20px] p-6 min-h-[240px] flex flex-col gap-4'>
        <h3 className='text-white text-xl font-semibold'>{category}</h3>
        <div className='flex flex-wrap gap-2'>
          {items.map((item) => (
            <span
              key={item}
              className='text-sm text-white/90 border border-white/20 rounded-full px-3 py-1 bg-white/5'
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Tilt>
);

const Tech = () => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {technologies.map((tech, index) => (
        <TechCard key={tech.category} index={index} {...tech} />
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
