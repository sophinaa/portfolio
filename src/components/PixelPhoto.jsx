import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const PIXEL_SIZE = 8;
const DURATION = 650;

// Draws a photo as chunky pixel art, sharpening to the real photo on hover/tap
const PixelPhoto = ({ src, alt, className = "" }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const pixelRef = useRef(PIXEL_SIZE);
  const frameRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const reduceMotion = useReducedMotion();

  const draw = useCallback((pixel) => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) {
      return;
    }

    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const dpr = window.devicePixelRatio || 1;

    // Crop like object-fit: cover, biased towards the top where the face is
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const sw = width / scale;
    const sh = height / scale;
    const sx = (image.naturalWidth - sw) / 2;
    const sy = (image.naturalHeight - sh) * 0.2;

    ctx.imageSmoothingEnabled = true;
    if (pixel <= 1) {
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
      return;
    }

    const w = Math.max(1, Math.round(width / (pixel * dpr)));
    const h = Math.max(1, Math.round(height / (pixel * dpr)));
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    draw(pixelRef.current);
  }, [draw]);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      imageRef.current = image;
      resize();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvasRef.current);

    return () => observer.disconnect();
  }, [src, resize]);

  useEffect(() => {
    const from = pixelRef.current;
    const to = revealed ? 1 : PIXEL_SIZE;
    cancelAnimationFrame(frameRef.current);

    if (reduceMotion) {
      pixelRef.current = to;
      draw(to);
      return undefined;
    }

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - (1 - t) ** 3;
      pixelRef.current = Math.round(from + (to - from) * eased);
      draw(pixelRef.current);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [revealed, reduceMotion, draw]);

  return (
    <button
      type='button'
      aria-pressed={revealed}
      aria-label={revealed ? "Show pixel-art version" : "Show the real photo"}
      onClick={() => setRevealed(!revealed)}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      className={`block cursor-pointer ${className}`}
    >
      <canvas ref={canvasRef} role='img' aria-label={alt} className='block h-full w-full' />
    </button>
  );
};

export default PixelPhoto;
