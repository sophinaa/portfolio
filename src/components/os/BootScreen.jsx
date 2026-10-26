import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { OsLogo } from "./icons";

const biosLines = [
  "SOPHINA BIOS v2.6  (C) 2026",
  "CPU: Curiosity @ 4.20 GHz",
  "Memory test: 640K ......... OK",
  "Detecting coffee .......... OK",
  "Loading portfolio drivers .. OK",
];

const LINE_DELAY = 220;
const LOGO_TIME = 1300;

// BIOS text, then the OS logo with a loading bar. Any click or key skips it.
const BootScreen = ({ onDone }) => {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);
  const showLogo = shown > biosLines.length;

  useEffect(() => {
    if (reduceMotion) {
      onDone();
      return undefined;
    }
    const delay = showLogo ? LOGO_TIME : LINE_DELAY;
    const timer = setTimeout(() => (showLogo ? onDone() : setShown(shown + 1)), delay);
    return () => clearTimeout(timer);
  }, [shown, showLogo, onDone, reduceMotion]);

  useEffect(() => {
    window.addEventListener("keydown", onDone);
    return () => window.removeEventListener("keydown", onDone);
  }, [onDone]);

  return (
    <button
      type='button'
      onClick={onDone}
      aria-label='Skip the boot screen'
      className='flex h-full w-full cursor-default flex-col bg-black p-6 text-left font-term text-xl text-paper sm:p-10 sm:text-2xl'
    >
      {showLogo ? (
        <span className='m-auto flex flex-col items-center gap-6'>
          <OsLogo className='h-16 w-16' />
          <span className='font-display text-4xl font-bold text-white sm:text-5xl'>
            Sophina<span className='text-butter'>OS</span>
          </span>
          <span className='block h-5 w-56 border-2 border-paper p-0.5'>
            <motion.span
              className='block h-full bg-[repeating-linear-gradient(90deg,#3b6cf0_0_10px,transparent_10px_14px)]'
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: LOGO_TIME / 1000, ease: "linear" }}
            />
          </span>
        </span>
      ) : (
        <>
          {biosLines.slice(0, shown).map((line) => (
            <span key={line} className='block'>
              {line}
            </span>
          ))}
          <span className='blink block'>█</span>
          <span className='mt-auto block text-paper/50'>Press any key to skip</span>
        </>
      )}
    </button>
  );
};

export default BootScreen;
