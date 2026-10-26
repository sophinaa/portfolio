import { useRef } from "react";
import { motion } from "framer-motion";

import TextType from "./TextType";
import { CurlyArrow, Flower, Sparkle } from "./Doodles";
import { heroRoles } from "../constants";

const letterColors = ["#ef4b32", "#a99bff", "#8fdcb2", "#d8f650", "#ffd95a"];

// Each letter jumps and changes colour on hover
const BouncyName = ({ text }) => (
  <h1 className='font-display text-[clamp(4.5rem,19vw,13rem)] leading-[0.85] text-ink' aria-label={text}>
    {text.split("").map((letter, index) => (
      <motion.span
        key={index}
        aria-hidden='true'
        className='inline-block cursor-default'
        initial={{ y: 80, opacity: 0, rotate: -12 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.15 + index * 0.06 }}
        whileHover={{
          y: -18,
          rotate: index % 2 ? 8 : -8,
          color: letterColors[index % letterColors.length],
          transition: { type: "spring", stiffness: 400, damping: 10 },
        }}
      >
        {letter}
      </motion.span>
    ))}
  </h1>
);

const Note = ({ children, className, delay, rotate = 0 }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.6, rotate }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", bounce: 0.5, delay }}
    className={`inline-block whitespace-nowrap rounded-md border-2 border-ink px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest shadow-sticker ${className}`}
  >
    {children}
  </motion.span>
);

const dragStickers = [
  { label: "React ⚛", className: "bg-lilac left-[6%] top-[22%]", rotate: -12 },
  { label: "{ Go }", className: "bg-mint right-[8%] top-[20%]", rotate: 6 },
  { label: "C# ♥", className: "bg-butter left-[10%] bottom-[16%]", rotate: 3 },
  { label: "TypeScript", className: "bg-tomato text-paper right-[6%] bottom-[22%]", rotate: -6 },
];

const Hero = () => {
  const boardRef = useRef(null);

  return (
    <section id='top' ref={boardRef} className='relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-32'>
      <Sparkle className='spin-slow absolute left-[18%] top-[14%] h-8 w-8 text-tomato' />
      <Sparkle className='spin-slow absolute bottom-[12%] right-[20%] h-10 w-10 text-lilac' />
      <Flower className='spin-slow absolute right-[28%] top-[12%] hidden h-12 w-12 md:block' fill='#a99bff' />

      {dragStickers.map(({ label, className, rotate }) => (
        <motion.div
          key={label}
          style={{ rotate }}
          drag
          dragConstraints={boardRef}
          dragElastic={0.2}
          whileHover={{ scale: 1.08 }}
          whileDrag={{ scale: 1.15, rotate: 0, zIndex: 30 }}
          className={`absolute z-20 hidden cursor-grab select-none rounded-full border-2 border-ink px-5 py-2.5 font-display text-xl shadow-sticker active:cursor-grabbing lg:block ${className}`}
        >
          {label}
        </motion.div>
      ))}

      <div className='relative z-10 mx-auto w-full max-w-5xl text-center'>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='font-hand text-3xl text-ink/80 md:text-4xl'
        >
          hiya, my name is
        </motion.p>

        <div className='relative mt-2 inline-block'>
          <BouncyName text='sophina' />

          <div className='absolute -left-4 -top-6 hidden -rotate-6 md:block'>
            <Note className='bg-lime' delay={0.8}>final-year CS @ Dundee</Note>
          </div>
          <div className='absolute -right-10 -top-2 hidden rotate-6 md:block'>
            <Note className='bg-lilac' delay={0.95}>ex-Barclays intern</Note>
          </div>
          <div className='absolute -bottom-6 right-2 hidden -rotate-3 md:block'>
            <Note className='bg-mint' delay={1.1}>hackathon winner &apos;25</Note>
          </div>
          <CurlyArrow className='absolute -bottom-14 left-6 hidden h-14 w-20 -scale-x-100 md:block' />
        </div>

        <div className='mt-6 flex flex-wrap justify-center gap-2 md:hidden'>
          <Note className='bg-lime' rotate={-3} delay={0.8}>final-year CS @ Dundee</Note>
          <Note className='bg-lilac' rotate={2} delay={0.95}>ex-Barclays intern</Note>
          <Note className='bg-mint' rotate={-2} delay={1.1}>hackathon winner &apos;25</Note>
        </div>

        <p className='mx-auto mt-10 max-w-2xl text-2xl font-medium md:mt-14 md:text-3xl'>
          I build{" "}
          <span className='relative inline-block'>
            <span className='absolute inset-x-0 bottom-1 -z-10 h-3 -rotate-1 bg-lime md:h-4' />
            <TextType
              as='span'
              text={heroRoles}
              typingSpeed={70}
              pauseDuration={1600}
              deletingSpeed={40}
              cursorCharacter='▌'
              cursorClassName='text-tomato'
            />
          </span>
        </p>

        <div className='mt-10 flex flex-wrap justify-center gap-4'>
          <a
            href='#projects'
            className='rounded-full border-2 border-ink bg-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-paper shadow-sticker transition-transform hover:-translate-y-1 hover:-rotate-2'
          >
            See my work ↓
          </a>
          <a
            href='#contact'
            className='rounded-full border-2 border-ink bg-paper px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest shadow-sticker transition-transform hover:-translate-y-1 hover:rotate-2'
          >
            Get in touch ✦
          </a>
        </div>

        <p className='mt-8 hidden font-hand text-xl text-ink/60 lg:block'>
          psst, the stickers are draggable
        </p>
      </div>
    </section>
  );
};

export default Hero;
