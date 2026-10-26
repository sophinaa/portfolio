import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// A hand-tuned "rolling hills" landscape, drawn pixel by pixel on a tiny canvas
// and scaled up with crisp edges so it stays sharp on any screen.
const W = 320;
const H = 180;

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const hex = (value) => [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));

// Pick from a palette with ordered dithering, which gives that classic pixel-art banding
const dither = (palette, t, x, y) => {
  const pos = Math.min(Math.max(t, 0), 1) * (palette.length - 1);
  const index = Math.floor(pos);
  const threshold = (BAYER[y % 4][x % 4] + 0.5) / 16;
  return palette[Math.min(index + (pos - index > threshold ? 1 : 0), palette.length - 1)];
};

const seeded = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const sky = ["#2a63d4", "#3574e0", "#4a86e8", "#64a0ef", "#8dbcf5"].map(hex);
const mainGreens = ["#a6d257", "#86bd42", "#6aa634", "#538f2a"].map(hex);
const frontGreens = ["#5d9a2e", "#477f24", "#36681c"].map(hex);
const backGreen = ["#2f5d1f", "#3a6c23"].map(hex);
const mountain = hex("#5b7fc4");
const patch = hex("#b9dc6e");
const pathColour = hex("#2b2233");
const flower = hex("#f4e478");

const backRidge = (x) => 86 + 7 * Math.sin(x / 38 + 1.2) + (x / W) * 10;
const mainRidge = (x) => 98 + 16 * Math.sin((x + 30) / 95) - 10 * Math.sin(x / 41) + (x / W) * 6;
const frontRidge = (x) => 146 - 9 * Math.sin(x / 70 + 2);
const pathLine = (x) => 136 + 8 * Math.sin(x / 85) - x * 0.04;

const patches = [
  { cx: 70, cy: 118, rx: 34, ry: 7 },
  { cx: 200, cy: 128, rx: 26, ry: 5 },
  { cx: 255, cy: 112, rx: 18, ry: 4 },
];

const drawScenery = () => {
  const random = seeded(26);
  const skyCanvas = document.createElement("canvas");
  const landCanvas = document.createElement("canvas");
  skyCanvas.width = landCanvas.width = W;
  skyCanvas.height = landCanvas.height = H;

  const skyData = new ImageData(W, H);
  const land = new ImageData(W, H);
  const set = (data, x, y, [r, g, b]) => {
    const i = (y * W + x) * 4;
    data.data[i] = r;
    data.data[i + 1] = g;
    data.data[i + 2] = b;
    data.data[i + 3] = 255;
  };

  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      set(skyData, x, y, dither(sky, y / 110, x, y));

      // a hazy blue mountain far away on the right
      if (x > 240 && y > 78 + Math.abs(x - 292) * 0.45) {
        set(land, x, y, mountain);
      }
      if (y > backRidge(x)) {
        set(land, x, y, dither(backGreen, (y - backRidge(x)) / 14, x, y));
      }
      if (y > mainRidge(x)) {
        let colour = dither(mainGreens, (y - mainRidge(x)) / 55, x, y);
        const inPatch = patches.some(({ cx, cy, rx, ry }) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1);
        if (inPatch && BAYER[y % 4][x % 4] < 9) {
          colour = patch;
        }
        set(land, x, y, colour);
      }
      if (x < 230 && Math.abs(y - pathLine(x)) < 1.2 - x / 400) {
        set(land, x, y, pathColour);
      }
      if (y > frontRidge(x)) {
        set(land, x, y, dither(frontGreens, (y - frontRidge(x)) / 35, x, y));
      }
    }
  }

  // grass tufts and little flowers
  for (let n = 0; n < 420; n += 1) {
    const x = Math.floor(random() * W);
    const y = Math.floor(mainRidge(x) + 2 + random() * (H - mainRidge(x)));
    const front = y > frontRidge(x);
    const shade = front ? hex("#2c5617") : hex("#4a8526");
    const height = 1 + Math.floor(random() * 3);
    for (let k = 0; k < height && y - k > 0; k += 1) {
      set(land, x, y - k, shade);
    }
  }
  for (let n = 0; n < 45; n += 1) {
    const x = Math.floor(random() * W);
    const y = Math.floor(frontRidge(x) + 4 + random() * 28);
    if (y < H) {
      set(land, x, y, flower);
    }
  }
  // ridge-line grass silhouette on the back hill
  for (let x = 0; x < W; x += 2 + Math.floor(random() * 4)) {
    const top = Math.floor(backRidge(x));
    for (let k = 1; k <= 1 + Math.floor(random() * 3); k += 1) {
      set(land, x, top - k, backGreen[0]);
    }
  }

  skyCanvas.getContext("2d").putImageData(skyData, 0, 0);
  landCanvas.getContext("2d").putImageData(land, 0, 0);
  return { skyCanvas, landCanvas };
};

// Fluffy clouds made of overlapping circles, with a shaded underside
const makeCloud = (random, width) => {
  const height = Math.round(width * 0.6);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  // a flat base of small puffs with one or two big rounded tops
  const base = height * 0.78;
  const count = 3 + Math.floor(random() * 3);
  const puffs = Array.from({ length: count }, (_, i) => ({
    cx: (width / (count + 1)) * (i + 1),
    cy: base - height * 0.12,
    r: height * 0.22,
  }));
  const tops = 1 + Math.floor(random() * 2);
  for (let i = 0; i < tops; i += 1) {
    const r = height * (0.28 + random() * 0.12);
    puffs.push({ cx: width * (0.3 + random() * 0.4), cy: Math.max(r + 1, base - r * 0.9), r });
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const inside = puffs.some(({ cx, cy, r }) => (x - cx) ** 2 + (y - cy) ** 2 < r * r) && y < base;
      if (inside) {
        ctx.fillStyle = y > base - height * 0.16 ? "#cfe0f7" : "#ffffff";
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  return canvas;
};

const PixelWallpaper = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { skyCanvas, landCanvas } = drawScenery();
    const random = seeded(7);
    const clouds = Array.from({ length: 11 }, () => {
      const width = 14 + Math.floor(random() * 30);
      return {
        sprite: makeCloud(random, width),
        x: random() * (W + 60) - 30,
        y: 6 + random() * 70,
        speed: 0.6 + (width / 44) * 2.2,
      };
    });

    let frame = 0;
    let last = performance.now();

    const draw = () => {
      ctx.drawImage(skyCanvas, 0, 0);
      clouds.forEach((cloud) => ctx.drawImage(cloud.sprite, Math.round(cloud.x), Math.round(cloud.y)));
      ctx.drawImage(landCanvas, 0, 0);
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (now - last < 80) {
        return;
      }
      const seconds = (now - last) / 1000;
      last = now;
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed * seconds;
        if (cloud.x > W + 4) {
          cloud.x = -cloud.sprite.width - 4;
        }
      });
      draw();
    };

    draw();
    if (!reduceMotion) {
      frame = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      aria-hidden='true'
      className={`h-full w-full object-cover object-[30%_70%] [image-rendering:pixelated] ${className}`}
    />
  );
};

export default PixelWallpaper;
