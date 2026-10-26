import { useEffect, useRef, useState } from "react";

import { OsLogo } from "./icons";
import { apps, desktopOrder } from "./apps";
import { sophinaPixel } from "../../assets";

const Clock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className='bevel-in px-3 py-1 font-label text-xs'>
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
};

const Taskbar = ({ windows, activeId, onOpen, onTaskClick, onShutdown, onTidy }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }
    const closeOnOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    // preventDefault tells the desktop not to also close the top window
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const launch = (id) => {
    setMenuOpen(false);
    onOpen(id);
  };

  return (
    <div className='bevel relative z-[1000] flex h-11 shrink-0 items-center gap-1.5 border-x-0 border-b-0 px-1.5'>
      <div ref={menuRef} className='relative'>
        <button
          type='button'
          aria-expanded={menuOpen}
          aria-haspopup='menu'
          onClick={() => setMenuOpen(!menuOpen)}
          className='btn px-3 py-1 font-display text-base font-bold normal-case'
          aria-pressed={menuOpen}
        >
          <OsLogo className='h-4 w-4' />
          Start
        </button>

        {menuOpen ? (
          <div role='menu' className='bevel absolute bottom-full left-0 mb-1 flex w-64 shadow-sticker-lg'>
            <div className='titlebar flex w-8 items-end justify-center pb-3'>
              <span className='rotate-180 font-display text-lg font-bold text-white [writing-mode:vertical-rl]'>
                Sophina<span className='text-butter'>OS</span>
              </span>
            </div>
            <div className='flex-1 p-1'>
              <div className='mb-1 flex items-center gap-3 border-b-2 border-ink/20 p-2'>
                <img src={sophinaPixel} alt='' className='h-10 w-10 border-2 border-ink [image-rendering:pixelated]' />
                <div>
                  <p className='font-display text-lg font-bold leading-none'>Sophina</p>
                  <p className='font-label text-[10px] uppercase text-ink/60'>Software engineer</p>
                </div>
              </div>
              {desktopOrder.map((id) => (
                <button
                  key={id}
                  type='button'
                  role='menuitem'
                  onClick={() => launch(id)}
                  className='flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm hover:bg-navy hover:text-white'
                >
                  <span className='flex h-6 w-6 items-center justify-center [&>*]:h-5 [&>*]:w-5'>{apps[id].icon}</span>
                  {apps[id].title}
                </button>
              ))}
              <div className='my-1 border-t-2 border-ink/20' />
              <button
                type='button'
                role='menuitem'
                onClick={() => {
                  setMenuOpen(false);
                  onTidy();
                }}
                className='flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm hover:bg-navy hover:text-white'
              >
                <span className='flex h-6 w-6 items-center justify-center'>▦</span>
                Tidy up desktop
              </button>
              <button
                type='button'
                role='menuitem'
                onClick={() => {
                  setMenuOpen(false);
                  onShutdown();
                }}
                className='flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm hover:bg-navy hover:text-white'
              >
                <span className='flex h-6 w-6 items-center justify-center'>⏻</span>
                Shut down…
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <span className='h-7 w-0.5 bg-shade' aria-hidden='true' />

      <ul className='flex min-w-0 flex-1 gap-1 overflow-x-auto'>
        {windows.map((win) => (
          <li key={win.id} className='min-w-0'>
            <button
              type='button'
              aria-pressed={activeId === win.id}
              onClick={() => onTaskClick(win.id)}
              className='btn w-36 max-w-[9rem] justify-start gap-2 px-2 py-1 text-[11px] normal-case sm:w-44 sm:max-w-[11rem]'
            >
              <span className='flex h-4 w-4 shrink-0 items-center justify-center'>{apps[win.id].icon}</span>
              <span className='truncate'>{apps[win.id].title}</span>
            </button>
          </li>
        ))}
      </ul>

      <Clock />
    </div>
  );
};

export default Taskbar;
