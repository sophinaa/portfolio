// Pixel-art doodles drawn on a tiny grid with crisp edges

const PixelArt = ({ rows, className = "", fill = "currentColor" }) => (
  <svg
    viewBox={`0 0 ${rows[0].length} ${rows.length}`}
    className={className}
    shapeRendering='crispEdges'
    aria-hidden='true'
  >
    {rows.flatMap((row, y) =>
      row.split("").map((cell, x) => (cell === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width='1' height='1' fill={fill} /> : null))
    )}
  </svg>
);

const star = [
  "....#....",
  "....#....",
  "...###...",
  "#########",
  ".#######.",
  "..#####..",
  "..##.##..",
  ".##...##.",
  ".#.....#.",
];

const heart = [
  ".##...##.",
  "####.####",
  "#########",
  "#########",
  ".#######.",
  "..#####..",
  "...###...",
  "....#....",
];

const sparkle = [
  "...#...",
  "...#...",
  "..###..",
  "###.###",
  "..###..",
  "...#...",
  "...#...",
];

export const PixelStar = (props) => <PixelArt rows={star} {...props} />;
export const PixelHeart = (props) => <PixelArt rows={heart} {...props} />;
export const PixelSparkle = (props) => <PixelArt rows={sparkle} {...props} />;
