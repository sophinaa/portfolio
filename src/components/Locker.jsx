import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { PixelSparkle } from "./Doodles";
import { barclays, duis, ducs, sophinaPixel } from "../assets";

const metal = "linear-gradient(160deg, #a9adb2 0%, #868a90 45%, #6f7379 100%)";
const metalInside = "linear-gradient(200deg, #9a9ea3 0%, #7b7f85 60%, #686c72 100%)";

const Vents = ({ className }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {[0, 1, 2, 3, 4].map((vent) => (
      <span key={vent} className='h-2.5 rounded-full bg-[#55595e] shadow-[inset_0_2px_3px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.35)]' />
    ))}
  </div>
);

const LogoSticker = ({ src, className }) => (
  <span className={`absolute block h-14 w-14 overflow-hidden rounded-full border-[3px] border-white shadow-[2px_3px_4px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16 ${className}`}>
    <img src={src} alt='' className='h-full w-full object-cover' />
  </span>
);

const DoorInside = () => (
  <div
    className='absolute inset-0 rounded-[12px] border-2 border-ink [backface-visibility:hidden] [transform:rotateY(180deg)]'
    style={{ background: metalInside }}
  >
    <Vents className='absolute inset-x-6 bottom-6' />
    <LogoSticker src={duis} className='left-5 top-5 -rotate-6 sm:top-6' />
    <LogoSticker src={barclays} className='right-5 top-14 rotate-6 sm:top-16' />
    <LogoSticker src={ducs} className='left-8 top-[6.5rem] rotate-3 sm:top-36' />
    <span className='absolute right-4 top-[8.5rem] rotate-[8deg] rounded-full border-[3px] border-white bg-lilac px-3 py-1 font-display text-sm shadow-[2px_3px_4px_rgba(0,0,0,0.35)] sm:top-44'>
      React
    </span>
    <span className='absolute left-5 top-[11.5rem] -rotate-[6deg] rounded-md border-[3px] border-white bg-tomato px-3 py-1 font-display text-sm text-paper shadow-[2px_3px_4px_rgba(0,0,0,0.35)] sm:top-60'>
      C# ♥
    </span>
    <span className='absolute right-6 top-[12.5rem] grid rotate-[4deg] grid-cols-3 gap-0.5 rounded-sm border-[3px] border-white bg-white shadow-[2px_3px_4px_rgba(0,0,0,0.35)] sm:top-[17rem]'>
      {["bg-tomato", "bg-butter", "bg-mint", "bg-lilac", "bg-lime", "bg-ink"].map((color) => (
        <span key={color} className={`h-3.5 w-3.5 ${color}`} />
      ))}
    </span>
  </div>
);

const DoorOutside = () => (
  <div
    className='absolute inset-0 rounded-[12px] border-2 border-ink [backface-visibility:hidden]'
    style={{ background: metal }}
  >
    <Vents className='absolute inset-x-8 top-8' />
    <Vents className='absolute inset-x-8 bottom-8' />
    <span className='absolute left-1/2 top-[38%] -translate-x-1/2 rounded-sm border border-[#55595e] bg-[#e6e2d6] px-3 py-1 font-label text-[11px] tracking-[0.2em] text-ink'>
      NO. 26
    </span>
    {/* handle on the opposite side to the hinge */}
    <span className='absolute left-4 top-1/2 h-16 w-3 -translate-y-1/2 rounded-full border-2 border-ink bg-[#c9ccd0]' />
  </div>
);

const Locker = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!inView) {
      return undefined;
    }
    const timer = setTimeout(() => setOpen(true), 350);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className='relative mx-auto w-fit pr-[110px] sm:pr-[150px]'>
      <div
        className='relative h-[380px] w-[230px] rounded-[14px] border-2 border-ink p-2.5 shadow-sticker-lg sm:h-[480px] sm:w-[300px]'
        style={{ background: metal, perspective: 1800 }}
      >
        {/* inside of the locker */}
        <div className='relative h-full w-full overflow-hidden rounded-lg bg-[#3a3c40] shadow-[inset_0_10px_30px_rgba(0,0,0,0.7)]'>
          <span className='absolute left-1/2 top-2 h-1.5 w-2/3 -translate-x-1/2 rounded-full bg-[#fff6d8] shadow-[0_0_22px_8px_rgba(255,236,170,0.45)]' />
          <span className='pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_top,rgba(255,236,170,0.22),transparent_70%)]' />

          <div className='absolute inset-x-9 top-8 sm:inset-x-8 sm:top-9'>
            <span className='absolute -left-4 -top-1 z-10 h-5 w-12 -rotate-[35deg] bg-[#d9d4c4]/80 sm:w-14' />
            <span className='absolute -right-4 -top-1 z-10 h-5 w-12 rotate-[35deg] bg-[#d9d4c4]/80 sm:w-14' />
            <img
              src={sophinaPixel}
              alt='Pixel-art portrait of Sophina'
              className='block aspect-square w-full border-[3px] border-[#e6e2d6] object-cover shadow-[0_6px_14px_rgba(0,0,0,0.5)] [image-rendering:pixelated]'
            />
            <svg viewBox='0 0 120 40' className='pointer-events-none absolute left-[46%] top-[1%] w-20 -translate-x-1/2 sm:w-24' fill='none' aria-hidden='true'>
              <ellipse cx='60' cy='20' rx='52' ry='11' stroke='#ffd95a' strokeWidth='2.5' transform='rotate(-8 60 20)' />
            </svg>
            <PixelSparkle className='blink absolute -right-2 top-1 h-4 w-4 text-butter' />
            <p className='pointer-events-none absolute -bottom-4 -left-4 z-10 -rotate-[10deg] font-display text-2xl font-bold text-butter drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] sm:text-3xl'>
              Sophina
            </p>
          </div>

          <p className='absolute inset-x-0 bottom-[5.5rem] whitespace-nowrap text-center font-display text-[18px] font-bold leading-none text-butter sm:bottom-[5.75rem] sm:text-[24px]'>
            Software Engineer
          </p>

          <div className='absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2 font-term leading-none text-paper/90'>
            <p className='text-[15px] sm:text-[18px]'>
              <span className='block text-[18px] text-butter sm:text-[22px]'>about_me.txt</span>
              final-year CS, loves building useful things
            </p>
            <p className='text-[15px] sm:text-[18px]'>
              <span className='block text-[18px] text-butter sm:text-[22px]'>goals.txt</span>
              land a grad role &amp; ship cool stuff
            </p>
          </div>
        </div>

        {/* the door, hinged on the right */}
        <motion.button
          type='button'
          aria-label={open ? "Close the locker" : "Open the locker"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          initial={false}
          animate={{ rotateY: open ? 112 : 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          className='absolute inset-0 z-20 origin-right cursor-pointer'
          style={{ transformStyle: "preserve-3d" }}
        >
          <DoorOutside />
          <DoorInside />
        </motion.button>
      </div>

      <p className='mt-5 text-center font-term text-2xl text-white'>
        {open ? "> tap the door to close" : "> tap the door to open"}
      </p>
    </div>
  );
};

export default Locker;
