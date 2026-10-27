// 16×14 pixel icons. One character per pixel, coloured by `palette`.

const palette = {
  K: "#0b0b0b",
  W: "#ffffff",
  G: "#c3c0b6",
  g: "#7f7c72",
  Y: "#ffd23f",
  y: "#d9a400",
  B: "#1b2a8c",
  b: "#3b6cf0",
  D: "#101418",
  L: "#7dff7a",
  R: "#ff4f8b",
};

const art = {
  folder: [
    "................",
    ".KKKKKK.........",
    "KYYYYYYK........",
    "KYYYYYYYKKKKKKK.",
    "KYYYYYYYYYYYYYYK",
    "KyyyyyyyyyyyyyyK",
    "KYYYYYYYYYYYYYYK",
    "KYYYYYYYYYYYYYYK",
    "KYYYYYYYYYYYYYYK",
    "KYYYYYYYYYYYYYYK",
    "KYYYYYYYYYYYYYYK",
    "KyyyyyyyyyyyyyyK",
    "KKKKKKKKKKKKKKKK",
    "................",
  ],
  notepad: [
    "..KKKKKKKKKK....",
    "..KWWWWWWWWKK...",
    "..KWggggggWWKK..",
    "..KWWWWWWWWWWK..",
    "..KWggggggggWK..",
    "..KWWWWWWWWWWK..",
    "..KWggggggggWK..",
    "..KWWWWWWWWWWK..",
    "..KWgggggWWWWK..",
    "..KWWWWWWWWWWK..",
    "..KWggggggggWK..",
    "..KWWWWWWWWWWK..",
    "..KKKKKKKKKKKK..",
    "................",
  ],
  mail: [
    "................",
    "................",
    "KKKKKKKKKKKKKKKK",
    "KKWWWWWWWWWWWWKK",
    "KWKWWWWWWWWWWKWK",
    "KWWKWWWWWWWWKWWK",
    "KWWWKWWWWWWKWWWK",
    "KWWWWKWRRWKWWWWK",
    "KWWWWWKRRKWWWWWK",
    "KWWWWKWKKWKWWWWK",
    "KWWWKWWWWWWKWWWK",
    "KWWKWWWWWWWWKWWK",
    "KKKKKKKKKKKKKKKK",
    "................",
  ],
  terminal: [
    "KKKKKKKKKKKKKKKK",
    "KGGGGGGGGGGGGGGK",
    "KGDDDDDDDDDDDDGK",
    "KGDLDDDDDDDDDDGK",
    "KGDDLDDDDDDDDDGK",
    "KGDLDDLLLDDDDDGK",
    "KGDDDDDDDDDDDDGK",
    "KGDDDDDDDDDDDDGK",
    "KGGGGGGGGGGGGGGK",
    "KKKKKKKKKKKKKKKK",
    "......KGGK......",
    "....KKKKKKKK....",
    "....KGGGGGGK....",
    "....KKKKKKKK....",
  ],
  bin: [
    "....KKKKKKKK....",
    "..KKGGGGGGGGKK..",
    "..KggggggggggK..",
    "..KKKKKKKKKKKK..",
    "...KGgGgGgGgK...",
    "...KGgGgGgGgK...",
    "...KGgGgGgGgK...",
    "...KGgGgGgGgK...",
    "...KGgGgGgGgK...",
    "...KGgGgGgGgK...",
    "...KGgGgGgGgK...",
    "....KGgGgGgK....",
    "....KKKKKKKK....",
    "................",
  ],
  locker: [
    "..KKKKKKKKKKKK..",
    "..KGGGGGGGGGGK..",
    "..KGggggggggGK..",
    "..KGGGGGGGGGGK..",
    "..KGggggggggGK..",
    "..KGGGGGGGGGGK..",
    "..KGGGGGGGRRGK..",
    "..KGGGGGGGRRGK..",
    "..KGGGGGGGGGGK..",
    "..KGggggggggGK..",
    "..KGGGGGGGGGGK..",
    "..KGggggggggGK..",
    "..KKKKKKKKKKKK..",
    "................",
  ],
  toolbox: [
    "................",
    ".....KKKKKK.....",
    ".....K....K.....",
    "KKKKKKKKKKKKKKKK",
    "KRRRRRRRRRRRRRRK",
    "KRRRRRRRRRRRRRRK",
    "KKKKKKKGGKKKKKKK",
    "KRRRRRRGGRRRRRRK",
    "KRRRRRRRRRRRRRRK",
    "KRRRRRRRRRRRRRRK",
    "KRRRRRRRRRRRRRRK",
    "KKKKKKKKKKKKKKKK",
    "................",
    "................",
  ],
  map: [
    "KKKKKKKKKKKKKKKK",
    "KbbbLLLbbbbbbbbK",
    "KbbLLLLLbbbbRRbK",
    "KbbbLLLbbbbRRRRK",
    "KbbbbLbbbbbRRRRK",
    "KbbbbbbbbbbbRRbK",
    "KbbbbbbbbbbbRbbK",
    "KYYYbbbbbbbbbbbK",
    "KYYYYYYbbbbbbbbK",
    "KYYYYYYYYYYbbbbK",
    "KYYYYYYYYYYYYYYK",
    "KyyyyyyyyyyyyyyK",
    "KKKKKKKKKKKKKKKK",
    "................",
  ],
  briefcase: [
    "................",
    ".....KKKKKK.....",
    ".....K....K.....",
    "KKKKKKKKKKKKKKKK",
    "KbbbbbbbbbbbbbbK",
    "KbbbbbbbbbbbbbbK",
    "KBBBBBBYYBBBBBBK",
    "KbbbbbbYYbbbbbbK",
    "KbbbbbbbbbbbbbbK",
    "KbbbbbbbbbbbbbbK",
    "KbbbbbbbbbbbbbbK",
    "KKKKKKKKKKKKKKKK",
    "................",
    "................",
  ],
};

export const PixelIcon = ({ name, className = "" }) => {
  const rows = art[name];

  return (
    <svg viewBox='0 0 16 14' shapeRendering='crispEdges' className={className} aria-hidden='true'>
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          palette[cell] ? <rect key={`${x}-${y}`} x={x} y={y} width='1' height='1' fill={palette[cell]} /> : null
        )
      )}
    </svg>
  );
};

// The four-colour "logo" used on the Start button
export const OsLogo = ({ className = "" }) => (
  <span className={`grid grid-cols-2 gap-px ${className}`} aria-hidden='true'>
    <span className='bg-tomato' />
    <span className='bg-lime' />
    <span className='bg-lilac' />
    <span className='bg-butter' />
  </span>
);
