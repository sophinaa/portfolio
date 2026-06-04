import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
const contactDetails = [
  {
    label: "Email",
    value: "sophina0212@gmail.com",
    link: "mailto:sophina0212@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sophinaa",
    link: "https://www.linkedin.com/in/sophinaa",
  },
  {
    label: "GitHub",
    value: "github.com/sophinaa",
    link: "https://github.com/sophinaa",
  },
];

const Contact = () => {
  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-1 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='w-full xl:flex-[1] xl:max-w-[780px] bg-black-100 px-12 py-10 rounded-2xl border border-white/10'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className='mt-10 space-y-6'>
          <div className='h-6' />
          {contactDetails.map(({ label, value, link }) => (
            <div
              key={label}
              className='flex w-full flex-col gap-2 sm:grid sm:grid-cols-[140px_max-content] sm:justify-between sm:items-center bg-black-200/50 border border-white/10 rounded-xl px-10 py-5'
            >
              <span className='text-white font-semibold tracking-wide'>
                {label}
              </span>
              <a
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel='noopener noreferrer'
                className='text-secondary hover:text-white sm:text-left sm:whitespace-nowrap'
              >
                {value}
              </a>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-[1.05] xl:-ml-44 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
