import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { education } from "../constants";

const EducationCard = ({ index, program, institution, period, details }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-8 md:p-12 rounded-3xl w-full border border-white/10 shadow-2xl'
  >
    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
      <div>
        <p className='text-secondary text-sm tracking-wide uppercase'>{period}</p>
        <h3 className='text-white text-3xl font-semibold mt-2'>{program}</h3>
        <p className='text-white-100 text-lg mt-1'>{institution}</p>
      </div>
      <div className='text-white text-sm bg-white/10 border border-white/20 rounded-full px-4 py-2 w-fit'>
        Full-time
      </div>
    </div>

    <ul className='mt-6 list-disc list-inside flex flex-col gap-3 text-white-100 text-base leading-relaxed'>
      {details.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className='mt-12 bg-black-100 rounded-[20px] border border-white/10'>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[220px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Academic journey</p>
          <h2 className={styles.sectionHeadText}>Education.</h2>
        </motion.div>
      </div>
      <div className={`${styles.padding} pt-0`}>
        {education.map((entry, index) => (
          <EducationCard key={entry.program} index={index} {...entry} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
