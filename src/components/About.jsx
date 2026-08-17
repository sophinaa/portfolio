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

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 mx-auto space-y-4 text-left text-secondary text-[17px] max-w-5xl leading-[30px]'
      >
        <p>
          I’m a final-year Computer Science student with a strong interest in
          software engineering, full-stack development and building technology
          that solves real-world problems. I enjoy turning ideas into practical,
          user-focused applications and have worked across web, mobile, backend,
          AI and data-driven projects using technologies including Python, Java,
          Go, JavaScript, React, SQL and Power BI.
        </p>

        <p>
          Through both academic projects, hackathons and industry experience,
          I’ve developed a strong foundation in software development,
          problem-solving, data structures, algorithms and collaborative
          development. I particularly enjoy learning new technologies by building
          with them and understanding how different parts of a system work
          together.
        </p>

        <p>
          I’m driven by continuous improvement, curiosity and creating technology
          that is genuinely useful. I’m currently focused on strengthening my
          software engineering skills, expanding my project portfolio and pursuing
          graduate opportunities where I can contribute to meaningful products
          while continuing to develop as an engineer.
        </p>
      </motion.div>

      <div className='mt-8 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
