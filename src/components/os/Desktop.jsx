import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import Taskbar from "./Taskbar";
import WindowFrame from "./WindowFrame";
import { apps, desktopOrder } from "./apps";
import PixelWallpaper from "./PixelWallpaper";

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

const POSITIONS_KEY = "sophinaos-desktop-layout";

// Where the visitor has dragged things, kept in their own browser only
const readPositions = () => {
  try {
    return JSON.parse(localStorage.getItem(POSITIONS_KEY)) || {};
  } catch {
    return {};
  }
};

const savePosition = (id, position) => {
  try {
    localStorage.setItem(POSITIONS_KEY, JSON.stringify({ ...readPositions(), [id]: position }));
  } catch {
    // storage blocked: positions just won't persist
  }
};

const clearPositions = () => {
  try {
    localStorage.removeItem(POSITIONS_KEY);
  } catch {
    // nothing to clear
  }
};

// Drag props for anything that can be moved around the desktop. `wasDragged` lets
// click handlers ignore the click that ends a drag.
const useDesktopDrag = (id, boundsRef) => {
  const saved = useMemo(() => readPositions()[id] ?? { x: 0, y: 0 }, [id]);
  const x = useMotionValue(saved.x);
  const y = useMotionValue(saved.y);
  const dragging = useRef(false);

  return {
    wasDragged: () => dragging.current,
    dragProps: {
      drag: true,
      dragMomentum: false,
      dragElastic: 0,
      dragConstraints: boundsRef,
      whileDrag: { scale: 1.05, zIndex: 5 },
      style: { x, y },
      onDragStart: () => {
        dragging.current = true;
      },
      onDragEnd: () => {
        savePosition(id, { x: x.get(), y: y.get() });
        setTimeout(() => {
          dragging.current = false;
        }, 0);
      },
    },
  };
};

const DesktopIcon = ({ id, boundsRef, selected, onSelect, onOpen, openOnClick }) => {
  const app = apps[id];
  const { dragProps, wasDragged } = useDesktopDrag(id, boundsRef);

  return (
    <motion.button
      type='button'
      {...dragProps}
      onClick={() => !wasDragged() && (openOnClick ? onOpen(id) : onSelect(id))}
      onDoubleClick={() => !wasDragged() && onOpen(id)}
      onKeyDown={(event) => event.key === "Enter" && onOpen(id)}
      className='group flex w-20 touch-none flex-col items-center gap-1 p-1 text-center outline-none'
    >
      <span className={`flex h-12 items-end justify-center ${selected ? "opacity-70" : ""}`}>{app.desktopIcon}</span>
      <span
        className={`px-1 text-xs leading-tight text-white [text-shadow:1px_1px_0_#000,-1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000] group-focus-visible:outline-dotted group-focus-visible:outline-1 group-focus-visible:outline-white ${
          selected ? "bg-navy" : ""
        }`}
      >
        {app.label}
      </span>
    </motion.button>
  );
};

const StickyNote = ({ boundsRef, isTouch }) => {
  const { dragProps } = useDesktopDrag("note", boundsRef);

  return (
    <motion.div
      {...dragProps}
      className='absolute bottom-5 right-5 w-60 cursor-grab touch-none select-none border-2 border-ink bg-butter p-4 shadow-sticker active:cursor-grabbing'
    >
      <div className='rotate-2'>
        <p className='font-display text-xl font-bold leading-tight'>hiya, I&apos;m Sophina!</p>
        <p className='mt-2 font-term text-xl leading-tight'>
          {isTouch ? "tap" : "double-click"} the icons to explore. you can drag them (and me) around too. psst, try the
          Terminal and the locker ✦
        </p>
      </div>
    </motion.div>
  );
};

const Desktop = ({ onShutdown }) => {
  const boundsRef = useRef(null);
  const zTop = useRef(10);
  const [windows, setWindows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [layoutVersion, setLayoutVersion] = useState(0);
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

  // Remounting the icons with a new key snaps them back to the grid
  const tidyDesktop = () => {
    clearPositions();
    setLayoutVersion((version) => version + 1);
  };

  return (
    <div className='flex h-full flex-col'>
      <div
        ref={boundsRef}
        className='relative min-h-0 flex-1 overflow-hidden bg-[#4a86e8]' onPointerDown={(event) => event.target === event.currentTarget && setSelected(null)}>
        <PixelWallpaper className='pointer-events-none absolute inset-0' />
        <h1 className='sr-only'>Sophina's portfolio — SophinaOS</h1>

        <nav aria-label='Desktop' className='absolute inset-0 grid auto-rows-[96px] grid-cols-4 content-start justify-items-center gap-1 p-3 sm:inset-auto sm:bottom-0 sm:left-0 sm:top-0 sm:grid-flow-col sm:grid-cols-none sm:grid-rows-[repeat(auto-fill,96px)]'>
          {desktopOrder.map((id) => (
            <DesktopIcon
              key={`${id}-${layoutVersion}`}
              id={id}
              boundsRef={boundsRef}
              selected={selected === id}
              onSelect={setSelected}
              onOpen={open}
              openOnClick={isTouch}
            />
          ))}
        </nav>

        <StickyNote key={`note-${layoutVersion}`} boundsRef={boundsRef} isTouch={isTouch} />

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

      <Taskbar windows={windows} activeId={activeId} onOpen={open} onTaskClick={onTaskClick} onShutdown={onShutdown} onTidy={tidyDesktop} />
    </div>
  );
};

export default Desktop;
