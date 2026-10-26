import { useState } from "react";
import { motion } from "framer-motion";

import { Flower, Sparkle } from "./Doodles";
import { contact } from "../constants";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id='contact' className='relative overflow-hidden px-4 pb-10 pt-24 sm:px-8 md:pt-32'>
      <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-ink bg-tomato px-6 py-16 text-center text-paper shadow-sticker-lg md:py-24'>
        <Sparkle className='spin-slow absolute left-8 top-8 h-10 w-10 text-lime' />
        <Flower className='spin-slow absolute bottom-8 right-10 h-14 w-14' fill='#a99bff' />

        <p className='font-mono text-xs uppercase tracking-[0.25em] text-paper/80'>✦ Contact</p>
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.5 }}
          className='mt-4 font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.9]'
        >
          say hi!
        </motion.h2>
        <p className='mt-4 font-hand text-3xl'>I&apos;m open to graduate roles and fun projects.</p>

        <div className='mt-10 flex flex-col items-center gap-3'>
          <button
            type='button'
            onClick={copyEmail}
            className='group relative rounded-full border-2 border-ink bg-paper px-6 py-4 font-mono text-sm font-bold text-ink shadow-sticker transition-transform hover:-translate-y-1 hover:-rotate-1 sm:text-lg'
          >
            {contact.email}
            <span className='ml-3 rounded-full bg-lime px-2 py-0.5 text-[10px] uppercase tracking-widest'>
              {copied ? "copied ✓" : "copy"}
            </span>
          </button>
          <span className='sr-only' aria-live='polite'>
            {copied ? "Email address copied" : ""}
          </span>

          <div className='mt-3 flex flex-wrap justify-center gap-3'>
            <a
              href={contact.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-full border-2 border-ink bg-lilac px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-sticker transition-transform hover:-translate-y-1 hover:rotate-2'
            >
              LinkedIn ↗
            </a>
            <a
              href={contact.github}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-full border-2 border-ink bg-lime px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-sticker transition-transform hover:-translate-y-1 hover:-rotate-2'
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      <footer className='mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-ink/60 sm:flex-row'>
        <span>© {new Date().getFullYear()} Sophina</span>
        <span>made with react, framer motion & far too many stickers</span>
      </footer>
    </section>
  );
};

export default Contact;
