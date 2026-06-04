import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import PixelCard from "./PixelCard";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <div className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full'
    >
      <PixelCard variant='pink' className='about-pixel-card'>
        <div className='about-pixel-card__inner'>
          <img
            src={icon}
            alt={`${title}-icon`}
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </PixelCard>
    </motion.div>
  </div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About me.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 mx-auto text-center text-secondary text-[17px] max-w-5xl leading-[30px]'
      >
        Third-year Computer Science student with a growing passion for software
        development and building practical technology that creates real-world
        impact. I enjoy learning by doing, whether that's tackling coding
        challenges, developing projects, or deepening my knowledge of Java,
        SQL, data structures, algorithms, and full-stack development. I'm
        especially drawn to creating efficient, user-focused applications and
        building the technical confidence to contribute meaningfully to
        professional teams. Beyond the technical side, I'm driven by personal
        growth, discipline, and using technology creatively to solve problems.
        Right now I'm focused on strengthening my programming foundations,
        expanding my project portfolio, and landing an internship where I can
        learn from experienced developers and make a real contribution.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
