import { motion } from "framer-motion";

import Section, { SectionHeading } from "./Section";
import { highlights } from "../constants";

const tilts = [-2, 1.5, -1];

const About = () => (
  <Section id='about'>
    <SectionHeading kicker='About' title='the short version.' />

    <div className='grid gap-6 md:grid-cols-3'>
      {highlights.map(({ big, detail, color }, index) => (
        <motion.div
          key={big}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: tilts[index] }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", bounce: 0.4, delay: index * 0.12 }}
          whileHover={{ rotate: 0, y: -6 }}
          className={`relative rounded-3xl border-2 border-ink p-7 shadow-sticker-lg ${color}`}
        >
          <span className='tape -top-3 left-1/2 -translate-x-1/2 rotate-2' />
          <p className='font-display text-5xl leading-none'>{big}</p>
          <p className='mt-4 text-base leading-relaxed'>{detail}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      className='paper-lined relative mx-auto mt-16 max-w-3xl rounded-sm border-2 border-ink px-8 pb-6 pt-8 shadow-sticker-lg md:px-14'
    >
      <span className='tape -left-6 top-3 -rotate-[30deg]' />
      <span className='tape -right-6 top-3 rotate-[30deg] bg-lilac/70' />
      <p className='font-hand text-[28px] leading-[36px] md:text-[32px] md:leading-[36px]'>
        I like turning ideas into things people actually use, across web, mobile, backend and data.
        Right now I&apos;m looking for <mark className='bg-lime px-1'>graduate roles</mark> where I can keep building
        (and keep learning) ✿
      </p>
    </motion.div>
  </Section>
);

export default About;
