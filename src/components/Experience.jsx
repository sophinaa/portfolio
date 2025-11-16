import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const iconSizing = {
  "Dundee University Computing Society": "w-[95%] h-[95%]",
  "University of St Andrews": "w-[92%] h-[92%]",
  "Angus & Dundee District Volleyball": "w-[90%] h-[90%]",
};

const iconRounding = {
  "Angus & Dundee District Volleyball": "rounded-3xl bg-white/10 p-1",
  "Dundee University Computing Society": "rounded-full bg-white/10 p-1",
};

const iconOffsets = {
  "University of St Andrews": "translate-y-[6%]",
};

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1b263b",
        color: "#e0e1dd",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #415a77" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full p-1'>
          {experience.icon ? (
            <img
              src={experience.icon}
              alt={experience.company_name}
              className={`${iconSizing[experience.company_name] || "w-[65%] h-[65%]"} ${
                iconRounding[experience.company_name] || ""
              } ${iconOffsets[experience.company_name] || ""} object-contain`}
            />
          ) : (
            <span className='text-white text-[16px] font-semibold text-center leading-tight'>
              {experience.company_name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 3)
                .toUpperCase()}
            </span>
          )}
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Community leadership & roles
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience & Volunteering.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
