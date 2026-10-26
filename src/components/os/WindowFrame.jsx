import { motion, useDragControls, useMotionValue } from "framer-motion";

const TitleButton = ({ label, onClick, children }) => (
  <button
    type='button'
    aria-label={label}
    onPointerDown={(event) => event.stopPropagation()}
    onClick={onClick}
    className='bevel flex h-6 w-6 items-center justify-center font-sans text-sm font-bold leading-none text-ink active:translate-x-px active:translate-y-px'
  >
    {children}
  </button>
);

// A draggable old-OS window. Position lives in motion values so dragging never re-renders React.
const WindowFrame = ({ win, app, active, maximized, boundsRef, onFocus, onClose, onMinimize, onToggleMaximize, children }) => {
  const controls = useDragControls();
  const x = useMotionValue(win.x);
  const y = useMotionValue(win.y);

  return (
    <motion.section
      role='dialog'
      aria-label={app.title}
      drag={!maximized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boundsRef}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
      style={maximized ? { x: 0, y: 0, zIndex: win.z } : { x, y, zIndex: win.z, width: win.w, height: win.h }}
      className={`bevel absolute flex flex-col shadow-sticker-lg ${maximized ? "inset-0" : "left-0 top-0"} ${
        win.minimized ? "hidden" : ""
      }`}
    >
      <div
        onPointerDown={(event) => !maximized && controls.start(event)}
        onDoubleClick={onToggleMaximize}
        className={`flex shrink-0 touch-none select-none items-center justify-between gap-2 border-b-2 border-ink px-1.5 py-1 ${
          active ? "titlebar text-white" : "bg-shade text-paper"
        } ${maximized ? "" : "cursor-move"}`}
      >
        <span className='flex min-w-0 items-center gap-2 pl-1 font-label text-xs uppercase sm:text-sm'>
          {app.icon}
          <span className='truncate'>{app.title}</span>
        </span>
        <span className='flex shrink-0 gap-1'>
          <TitleButton label={`Minimise ${app.title}`} onClick={onMinimize}>
            _
          </TitleButton>
          <TitleButton label={`${maximized ? "Restore" : "Maximise"} ${app.title}`} onClick={onToggleMaximize}>
            {maximized ? "❐" : "□"}
          </TitleButton>
          <TitleButton label={`Close ${app.title}`} onClick={onClose}>
            ×
          </TitleButton>
        </span>
      </div>

      <div className='min-h-0 flex-1 overflow-auto'>{children}</div>
    </motion.section>
  );
};

export default WindowFrame;
