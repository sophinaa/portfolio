import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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

const Halo = ({ className }) => (
  <svg viewBox='0 0 120 50' className={className} fill='none' aria-hidden='true'>
    <ellipse cx='60' cy='26' rx='54' ry='12' stroke='#e2c87a' strokeWidth='2.5' transform='rotate(-6 60 26)' />
    <path d='M20 14 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 z' fill='#e2c87a' />
    <path d='M96 34 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 z' fill='#e2c87a' />
  </svg>
);

const CurlyArrow = ({ className }) => (
  <svg viewBox='0 0 24 24' className={className} fill='none' aria-hidden='true'>
    <path d='M3 4 C 14 2, 20 8, 18 20' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
    <path d='M14 17 L18 21 L21 16' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

// Books, a laptop, earbuds and pencils on the locker floor
const Shelf = () => (
  <div className='absolute inset-x-0 bottom-0 h-[17%] border-t-2 border-[#26282b] bg-gradient-to-b from-[#4a4c50] to-[#2f3134]'>
    <div className='absolute bottom-[38%] left-[7%] w-[30%]'>
      <span className='block h-3 w-[92%] rounded-sm border border-ink bg-[#e8dcb8] sm:h-4' />
      <span className='block h-3.5 w-full rounded-sm border border-ink bg-[#2c3d78] sm:h-5' />
      <span className='block h-3 w-[96%] rounded-sm border border-ink bg-[#e8dcb8] sm:h-4' />
    </div>
    <span className='absolute bottom-[34%] right-[10%] h-2.5 w-[40%] -skew-x-[20deg] rounded-sm border border-ink bg-gradient-to-r from-[#1b1c1f] to-[#3a3b40] sm:h-3' />
    <span className='absolute bottom-[54%] right-[18%] h-3 w-5 rounded-[6px] border border-ink bg-[#f2f0ea] sm:h-4 sm:w-7' />
    <span className='absolute bottom-[16%] left-[40%] h-1 w-[22%] rotate-[8deg] rounded-full bg-tomato' />
    <span className='absolute bottom-[10%] left-[46%] h-1 w-[20%] -rotate-[6deg] rounded-full bg-[#3b6cf0]' />
    <span className='absolute bottom-[22%] left-[52%] h-1 w-[16%] rotate-[2deg] rounded-full bg-[#5fd47a]' />
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
    <div ref={ref} className='relative mx-auto w-fit pr-[96px] sm:pr-[170px]'>
      <div
        className='relative h-[440px] w-[250px] rounded-[14px] border-2 border-ink p-2.5 shadow-sticker-lg sm:h-[560px] sm:w-[340px]'
        style={{ background: metal, perspective: 1800 }}
      >
        {/* inside of the locker */}
        <div className='relative h-full w-full overflow-hidden rounded-lg bg-[#3a3c40] shadow-[inset_0_10px_30px_rgba(0,0,0,0.7)]'>
          <span className='absolute left-1/2 top-2 z-10 h-1.5 w-2/3 -translate-x-1/2 rounded-full bg-[#fff6d8] shadow-[0_0_22px_8px_rgba(255,236,170,0.45)]' />
          <span className='pointer-events-none absolute inset-x-0 top-0 z-10 h-2/3 bg-[radial-gradient(ellipse_at_top,rgba(255,236,170,0.18),transparent_70%)]' />

          {/* the poster */}
          <div className='absolute inset-x-[12%] top-[7%]'>
            <img
              src={sophinaPixel}
              alt='Pixel-art portrait of Sophina, taped up inside her locker'
              className='block aspect-square w-full object-cover shadow-[0_6px_14px_rgba(0,0,0,0.5)] [image-rendering:pixelated]'
            />
            {["-left-3 -top-1 -rotate-[35deg]", "-right-3 -top-1 rotate-[35deg]", "-left-3 -bottom-1 rotate-[35deg]", "-right-3 -bottom-1 -rotate-[35deg]"].map(
              (position) => (
                <span key={position} className={`absolute h-4 w-10 bg-[#8d8b84]/80 sm:w-12 ${position}`} />
              )
            )}
            <Halo className='pointer-events-none absolute left-1/2 top-[1%] w-[46%] -translate-x-1/2' />
            <p className='absolute -left-[10%] top-[8%] -rotate-[14deg] font-hand text-2xl font-bold leading-[0.8] text-gold sm:text-3xl'>
              Sophina
              <svg viewBox='0 0 80 10' className='mt-0.5 block w-16 sm:w-20' fill='none' aria-hidden='true'>
                <path d='M2 6 Q 30 1 78 4 M8 9 Q 34 5 70 7' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
              </svg>
            </p>
          </div>

          <p className='absolute left-[10%] top-[46%] -rotate-[4deg] font-hand text-[34px] font-bold leading-[0.75] text-gold sm:top-[47%] sm:text-[44px]'>
            Software
            <span className='block pl-10 sm:pl-14'>Engineer</span>
          </p>

          {/* notes, written straight onto the locker */}
          <div className='absolute inset-x-[7%] top-[64%] grid grid-cols-2 gap-2 font-hand leading-[1.05] text-[#e9e4d6] sm:gap-3'>
            <p className='text-xs sm:text-base'>
              <span className='block whitespace-nowrap text-base text-gold sm:text-[22px]'>About me..</span>
              final-year CS student who loves building useful things
            </p>
            <p className='text-xs sm:text-base'>
              <span className='flex items-end gap-1 whitespace-nowrap text-base text-gold sm:text-[22px]'>
                I&apos;m here to-
                <CurlyArrow className='mb-1 h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5' />
              </span>
              land a grad role &amp; ship cool stuff
            </p>
          </div>

          <Shelf />
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
