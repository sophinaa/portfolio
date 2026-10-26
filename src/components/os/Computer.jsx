import { useCallback, useState } from "react";

import BootScreen from "./BootScreen";
import Desktop from "./Desktop";

const BOOTED_KEY = "sophinaos-booted";

const alreadyBooted = () => {
  try {
    return sessionStorage.getItem(BOOTED_KEY) === "1";
  } catch {
    return false;
  }
};

// The beige CRT monitor. On phones the bezel goes away and the screen fills the page.
const Computer = () => {
  const [state, setState] = useState(() => (alreadyBooted() ? "desktop" : "boot"));

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOTED_KEY, "1");
    } catch {
      // private mode: just boot every time
    }
    setState("desktop");
  }, []);

  const power = () => setState(state === "off" ? "boot" : "off");

  return (
    <div className='flex h-[100dvh] w-full items-stretch justify-center bg-[#1c1a24] md:p-5 lg:p-7'>
      <div className='relative flex w-full max-w-[1500px] flex-col md:rounded-[28px] md:bg-[linear-gradient(160deg,#e9e3d1,#cfc7b1)] md:p-5 md:pb-0 md:shadow-[inset_-6px_-6px_0_#a99f86,inset_6px_6px_0_#fbf8ee,0_30px_60px_rgba(0,0,0,0.5)]'>
        {/* the glass */}
        <div className='relative min-h-0 flex-1 overflow-hidden bg-black md:rounded-[18px] md:border-4 md:border-[#3b3830] md:shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]'>
          {state === "boot" ? <BootScreen onDone={finishBoot} /> : null}
          {state === "desktop" ? <Desktop onShutdown={() => setState("off")} /> : null}
          {state === "off" ? (
            <button
              type='button'
              onClick={() => setState("boot")}
              className='flex h-full w-full flex-col items-center justify-center gap-4 bg-black p-6 text-center font-term text-2xl text-[#ff9d3d] sm:text-3xl'
            >
              It&apos;s now safe to turn off your computer.
              <span className='text-xl text-paper/60'>(or click to turn it back on)</span>
            </button>
          ) : null}

          <div className='crt-overlay pointer-events-none absolute inset-0 z-[2000]' aria-hidden='true' />
        </div>

        {/* bottom of the bezel: badge + power button */}
        <div className='hidden h-14 items-center justify-between px-3 md:flex'>
          <span className='font-display text-lg font-bold tracking-wide text-[#6f6754]'>
            SOPHINA<span className='text-[#9a8f73]'>98</span>
          </span>
          <div className='flex items-center gap-4'>
            <span className='flex flex-col gap-1' aria-hidden='true'>
              {[0, 1, 2].map((slot) => (
                <span key={slot} className='block h-0.5 w-16 bg-[#b5ab92]' />
              ))}
            </span>
            <span
              className={`h-2.5 w-2.5 ${state === "off" ? "bg-[#6b2a12]" : "bg-lime shadow-[0_0_8px_#7dff7a]"}`}
              aria-hidden='true'
            />
            <button
              type='button'
              onClick={power}
              aria-label={state === "off" ? "Turn the computer on" : "Turn the computer off"}
              className='bevel h-8 w-8 font-sans text-sm'
            >
              ⏻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computer;
