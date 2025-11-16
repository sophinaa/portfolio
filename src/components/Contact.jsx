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
    label: "Phone",
    value: "+44 7403 018047",
    link: "tel:+447403018047",
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
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl border border-white/10'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className='mt-10 space-y-6'>
          <div className='h-6' />
          {contactDetails.map(({ label, value, link }) => (
            <div
              key={label}
              className='flex flex-col sm:flex-row sm:items-center sm:justify-between bg-black-200/50 border border-white/10 rounded-xl px-4 py-3'
            >
              <span className='text-white font-semibold tracking-wide'>
                {label}
              </span>
              <a
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel='noopener noreferrer'
                className='text-secondary hover:text-white break-all'
              >
                {value}
              </a>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
