import { motion } from "framer-motion";

import { Squiggle } from "./Doodles";

export const SectionHeading = ({ kicker, title, note, dark = false, squiggle = "#ef4b32" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ type: "spring", bounce: 0.35, duration: 0.8 }}
    className='mb-12 md:mb-16'
  >
    <p
      className={`font-mono text-xs uppercase tracking-[0.25em] ${
        dark ? "text-paper/60" : "text-ink/60"
      }`}
    >
      ✦ {kicker}
    </p>
    <h2
      className={`mt-3 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl ${
        dark ? "text-paper" : "text-ink"
      }`}
    >
      {title}
    </h2>
    <Squiggle className='mt-2 h-4 w-40 md:w-56' color={squiggle} />
    {note ? (
      <p className={`mt-2 font-hand text-2xl ${dark ? "text-lime" : "text-ink/70"}`}>{note}</p>
    ) : null}
  </motion.div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative px-4 py-24 sm:px-8 md:py-32 ${className}`}>
    <div className='mx-auto max-w-6xl'>{children}</div>
  </section>
);

export default Section;
