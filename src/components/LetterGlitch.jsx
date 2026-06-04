import { useEffect, useRef } from "react";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*@";

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const int = Number.parseInt(value, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const LetterGlitch = ({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
  speed = 10,
  colors = ["#2b4539", "#61dca3", "#61b3dc"],
  showCenterVignette = true,
  showOuterVignette = false,
  className = "",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    const colorPalette = colors.map(hexToRgb);
    let columns = [];
    let animationFrame = 0;
    let lastTimestamp = 0;
    let glitchAccumulator = 0;

    const resizeCanvas = () => {
      const { clientWidth, clientHeight } = canvas;
      const ratio = window.devicePixelRatio || 1;

      canvas.width = clientWidth * ratio;
      canvas.height = clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const columnWidth = 18;
      const totalColumns = Math.ceil(clientWidth / columnWidth);

      columns = Array.from({ length: totalColumns }, () => ({
        y: Math.random() * clientHeight,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: 0.2 + Math.random() * 0.6,
      }));
    };

    const drawVignette = (width, height) => {
      if (centerVignette || showCenterVignette) {
        const gradient = context.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          width * 0.45
        );

        gradient.addColorStop(0, "rgba(13, 27, 42, 0)");
        gradient.addColorStop(1, "rgba(13, 27, 42, 0.35)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }

      if (outerVignette || showOuterVignette) {
        const outerGradient = context.createRadialGradient(
          width / 2,
          height / 2,
          width * 0.15,
          width / 2,
          height / 2,
          width * 0.75
        );

        outerGradient.addColorStop(0, "rgba(13, 27, 42, 0)");
        outerGradient.addColorStop(1, "rgba(4, 9, 16, 0.65)");

        context.fillStyle = outerGradient;
        context.fillRect(0, 0, width, height);
      }
    };

    const render = (timestamp) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const delta = timestamp - lastTimestamp;

      lastTimestamp = timestamp;
      glitchAccumulator += delta;

      context.fillStyle = smooth
        ? "rgba(13, 27, 42, 0.18)"
        : "rgba(13, 27, 42, 0.32)";
      context.fillRect(0, 0, width, height);

      context.font = "600 16px Poppins";
      context.textBaseline = "top";

      columns.forEach((column, index) => {
        const paletteColor = column.color;

        context.fillStyle = `rgba(${paletteColor.r}, ${paletteColor.g}, ${paletteColor.b}, ${column.alpha})`;
        context.fillText(column.glyph, index * 18, column.y);

        column.y += speed * 0.12 + Math.random() * 0.35;

        if (column.y > height + 40) {
          column.y = -20;
        }
      });

      if (glitchAccumulator >= glitchSpeed) {
        const mutations = Math.max(1, Math.floor(columns.length * 0.16));

        for (let i = 0; i < mutations; i += 1) {
          const index = Math.floor(Math.random() * columns.length);
          columns[index] = {
            ...columns[index],
            glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
            color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
            alpha: 0.18 + Math.random() * 0.72,
          };
        }

        glitchAccumulator = 0;
      }

      drawVignette(width, height);
      animationFrame = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [
    centerVignette,
    colors,
    glitchSpeed,
    outerVignette,
    showCenterVignette,
    showOuterVignette,
    smooth,
    speed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`letter-glitch ${className}`.trim()}
      aria-hidden='true'
    />
  );
};

export default LetterGlitch;
