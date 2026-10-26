import { motion } from "framer-motion";

import Section, { SectionHeading } from "./Section";
import Locker from "./Locker";
import { highlights } from "../constants";

const tilts = [-2, 1.5, -1];

const About = () => (
  <Section id='about'>
    <SectionHeading kicker='About' title='the short version.' />

    <div className='grid items-center gap-14 lg:grid-cols-[auto_1fr]'>
      <Locker />

      <div className='grid gap-7'>
        {highlights.map(({ big, detail, color }, index) => (
          <motion.div
            key={big}
            initial={{ opacity: 0, x: 40, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: tilts[index] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", bounce: 0.4, delay: index * 0.12 }}
            whileHover={{ rotate: 0, y: -6 }}
            className={`relative rounded-3xl border-2 border-ink px-7 py-6 shadow-sticker-lg ${color}`}
          >
            <span className='tape -top-3 left-1/2 -translate-x-1/2 rotate-2' />
            <p className='font-display text-4xl leading-none md:text-5xl'>{big}</p>
            <p className='mt-3 text-base leading-relaxed'>{detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

export default About;
