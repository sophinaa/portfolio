import { motion } from "framer-motion";

export const Sparkle = ({ className = "", fill = "currentColor" }) => (
  <svg viewBox='0 0 24 24' className={className} aria-hidden='true'>
    <path
      d='M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z'
      fill={fill}
    />
  </svg>
);

export const Flower = ({ className = "", fill = "currentColor" }) => (
  <svg viewBox='0 0 40 40' className={className} aria-hidden='true'>
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse
        key={angle}
        cx='20'
        cy='10'
        rx='6'
        ry='9'
        fill={fill}
        stroke='#16130f'
        strokeWidth='1.5'
        transform={`rotate(${angle} 20 20)`}
      />
    ))}
    <circle cx='20' cy='20' r='5' fill='#ffd95a' stroke='#16130f' strokeWidth='1.5' />
  </svg>
);

// A hand-drawn squiggle that draws itself when scrolled into view
export const Squiggle = ({ className = "", color = "#ef4b32" }) => (
  <svg viewBox='0 0 300 24' className={className} fill='none' aria-hidden='true'>
    <motion.path
      d='M2 14 C 30 2, 50 24, 80 12 S 130 2, 160 13 S 215 24, 240 11 S 285 4, 298 12'
      stroke={color}
      strokeWidth='5'
      strokeLinecap='round'
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    />
  </svg>
);

// Curly hand-drawn arrow, pointing down-right by default
export const CurlyArrow = ({ className = "" }) => (
  <svg viewBox='0 0 80 60' className={className} fill='none' aria-hidden='true'>
    <path
      d='M4 6 C 30 0, 52 10, 46 26 C 42 38, 24 34, 30 24 C 36 14, 62 26, 70 50'
      stroke='#16130f'
      strokeWidth='2.5'
      strokeLinecap='round'
    />
    <path d='M60 46 L71 52 L73 39' stroke='#16130f' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
