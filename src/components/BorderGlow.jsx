import { useMemo, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const BorderGlow = ({
  children,
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "transparent",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = [],
  className = "",
}) => {
  const [glowState, setGlowState] = useState({
    active: false,
    x: 50,
    y: 50,
    opacity: 0,
  });

  const glowGradient = useMemo(() => {
    if (colors.length > 1) {
      return `conic-gradient(from 180deg at ${glowState.x}% ${glowState.y}%, ${colors.join(", ")})`;
    }

    return `radial-gradient(circle at ${glowState.x}% ${glowState.y}%, rgba(${glowColor}, ${0.95 * glowIntensity}) 0%, rgba(${glowColor}, ${0.35 * glowIntensity}) 32%, rgba(${glowColor}, 0) 72%)`;
  }, [colors, glowColor, glowIntensity, glowState.x, glowState.y]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const nearestEdge = Math.min(x, rect.width - x, y, rect.height - y);
    const edgeDistance = clamp(1 - nearestEdge / edgeSensitivity, 0, 1);

    setGlowState({
      active: edgeDistance > 0,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: edgeDistance * glowIntensity,
    });
  };

  const handleMouseLeave = () => {
    setGlowState((current) => ({
      ...current,
      active: false,
      opacity: 0,
    }));
  };

  return (
    <div
      className={`border-glow ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--border-glow-radius": `${borderRadius}px`,
        "--border-glow-bg": backgroundColor,
        "--border-glow-size": `${glowRadius * 4}px`,
        "--border-glow-opacity": glowState.opacity,
        "--border-glow-cone-spread": `${coneSpread}deg`,
      }}
    >
      <div
        className={`border-glow__fx ${glowState.active ? "border-glow__fx--active" : ""} ${
          animated ? "border-glow__fx--animated" : ""
        }`}
        style={{ backgroundImage: glowGradient }}
      />
      <div className='border-glow__content'>{children}</div>
    </div>
  );
};

export default BorderGlow;
