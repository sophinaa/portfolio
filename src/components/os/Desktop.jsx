import { useCallback, useEffect, useRef, useState } from "react";

import Taskbar from "./Taskbar";
import WindowFrame from "./WindowFrame";
import { apps, desktopOrder } from "./apps";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
};

const DesktopIcon = ({ id, selected, onSelect, onOpen, openOnClick }) => {
  const app = apps[id];

  return (
    <button
      type='button'
      onClick={() => (openOnClick ? onOpen(id) : onSelect(id))}
      onDoubleClick={() => onOpen(id)}
      onKeyDown={(event) => event.key === "Enter" && onOpen(id)}
      className='group flex w-20 flex-col items-center gap-1 p-1 text-center outline-none'
    >
      <span className={`flex h-12 items-end justify-center ${selected ? "opacity-70" : ""}`}>{app.desktopIcon}</span>
      <span
        className={`px-1 text-xs leading-tight text-white [text-shadow:1px_1px_0_#000] group-focus-visible:outline-dotted group-focus-visible:outline-1 group-focus-visible:outline-white ${
          selected ? "bg-navy" : ""
        }`}
      >
        {app.label}
      </span>
    </button>
  );
};

const Desktop = ({ onShutdown }) => {
  const boundsRef = useRef(null);
  const zTop = useRef(10);
  const [windows, setWindows] = useState([]);
  const [selected, setSelected] = useState(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTouch = useMediaQuery("(pointer: coarse)");

  const visible = windows.filter((win) => !win.minimized);
  const activeId = visible.length ? visible.reduce((top, win) => (win.z > top.z ? win : top)).id : null;

  const focus = useCallback((id) => {
    zTop.current += 1;
    const z = zTop.current;
    setWindows((current) => current.map((win) => (win.id === id ? { ...win, z, minimized: false } : win)));
  }, []);

  const open = useCallback(
    (id) => {
      setSelected(null);
      zTop.current += 1;
      const z = zTop.current;
      setWindows((current) => {
        if (current.some((win) => win.id === id)) {
          return current.map((win) => (win.id === id ? { ...win, z, minimized: false } : win));
        }
        const bounds = boundsRef.current?.getBoundingClientRect() ?? { width: 1024, height: 700 };
        const app = apps[id];
        const w = Math.min(app.width, bounds.width - 16);
        const h = Math.min(app.height, bounds.height - 16);
        const cascade = (current.length % 6) * 28;
        const x = Math.max(8, Math.min(bounds.width - w - 8, (bounds.width - w) / 2 + 40 + cascade - 84));
        const y = Math.max(8, Math.min(bounds.height - h - 8, (bounds.height - h) / 2 + cascade - 70));
        return [...current, { id, z, x, y, w, h, minimized: false, maximized: false }];
      });
    },
    []
  );

  const close = useCallback((id) => setWindows((current) => current.filter((win) => win.id !== id)), []);
  const minimize = useCallback(
    (id) => setWindows((current) => current.map((win) => (win.id === id ? { ...win, minimized: true } : win))),
    []
  );
  const toggleMaximize = useCallback(
    (id) => setWindows((current) => current.map((win) => (win.id === id ? { ...win, maximized: !win.maximized } : win))),
    []
  );

  // Say hello with the About window on bigger screens
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) {
      open("about");
    }
  }, [open]);

  // Escape closes the window on top
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && activeId && !event.defaultPrevented) {
        close(activeId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, close]);

  const onTaskClick = (id) => (id === activeId ? minimize(id) : focus(id));

  return (
    <div className='flex h-full flex-col'>
      <div ref={boundsRef} className='desktop relative min-h-0 flex-1 overflow-hidden' onPointerDown={(event) => event.target === event.currentTarget && setSelected(null)}>
        <h1 className='sr-only'>Sophina's portfolio — SophinaOS</h1>

        <nav aria-label='Desktop' className='absolute inset-0 grid auto-rows-[96px] grid-cols-4 content-start justify-items-center gap-1 p-3 sm:inset-auto sm:bottom-0 sm:left-0 sm:top-0 sm:grid-flow-col sm:grid-cols-none sm:grid-rows-[repeat(auto-fill,96px)]'>
          {desktopOrder.map((id) => (
            <DesktopIcon key={id} id={id} selected={selected === id} onSelect={setSelected} onOpen={open} openOnClick={isTouch} />
          ))}
        </nav>

        {/* sticky note with instructions */}
        <div className='pointer-events-none absolute bottom-5 right-5 w-60 rotate-2 border-2 border-ink bg-butter p-4 shadow-sticker'>
          <p className='font-display text-xl font-bold leading-tight'>hiya, I&apos;m Sophina!</p>
          <p className='mt-2 font-term text-xl leading-tight'>
            {isTouch ? "tap" : "double-click"} the icons to explore. psst, try the Terminal and the locker ✦
          </p>
        </div>

        {windows.map((win) => {
          const app = apps[win.id];
          const { Component } = app;
          return (
            <WindowFrame
              key={win.id}
              win={win}
              app={app}
              active={win.id === activeId}
              maximized={win.maximized || isMobile}
              boundsRef={boundsRef}
              onFocus={() => win.id !== activeId && focus(win.id)}
              onClose={() => close(win.id)}
              onMinimize={() => minimize(win.id)}
              onToggleMaximize={() => toggleMaximize(win.id)}
            >
              <Component open={open} close={() => close(win.id)} />
            </WindowFrame>
          );
        })}
      </div>

      <Taskbar windows={windows} activeId={activeId} onOpen={open} onTaskClick={onTaskClick} onShutdown={onShutdown} />
    </div>
  );
};

export default Desktop;
