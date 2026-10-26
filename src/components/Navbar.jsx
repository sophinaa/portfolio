import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { navLinks } from "../constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const sections = navLinks
      .map((nav) => document.getElementById(nav.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className='fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6'>
      <motion.div
        style={{ scaleX: progress }}
        className='fixed inset-x-0 top-0 h-1.5 origin-left bg-tomato'
      />

      <nav className='mx-auto flex max-w-6xl items-center justify-between rounded-full border-2 border-ink bg-paper/90 py-2 pl-5 pr-2 shadow-sticker backdrop-blur'>
        <a
          href='#top'
          onClick={() => setOpen(false)}
          className='group flex items-center gap-1.5 font-display text-2xl leading-none'
        >
          sophina
          <span className='inline-block text-tomato transition-transform duration-500 group-hover:rotate-180'>
            ✱
          </span>
        </a>

        <ul className='hidden items-center gap-1 md:flex'>
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === nav.id ? "bg-ink text-paper" : "hover:bg-ink/10"
                }`}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <a
          href='#contact'
          className='hidden rounded-full border-2 border-ink bg-lime px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-transform hover:-rotate-3 hover:scale-105 md:inline-block'
        >
          Say hi ↗
        </a>

        <button
          type='button'
          aria-expanded={open}
          aria-controls='mobile-menu'
          onClick={() => setOpen(!open)}
          className='rounded-full border-2 border-ink bg-lime px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest md:hidden'
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <motion.ul
          id='mobile-menu'
          initial={{ opacity: 0, y: -10, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          className='mx-auto mt-3 flex max-w-6xl flex-col gap-1 rounded-3xl border-2 border-ink bg-paper p-3 shadow-sticker md:hidden'
        >
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                onClick={() => setOpen(false)}
                className='block rounded-2xl px-4 py-3 font-display text-2xl hover:bg-lime'
              >
                {nav.title}
              </a>
            </li>
          ))}
        </motion.ul>
      ) : null}
    </header>
  );
};

export default Navbar;
