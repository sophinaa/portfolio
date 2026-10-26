const words = ["full-stack", "backend", "react native", "data & AI", "C#", "Go", "TypeScript", "Python", "distributed systems"];

const Band = ({ className, reverse }) => (
  <div className={`overflow-hidden border-y-2 border-ink py-3 ${className}`}>
    <div className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}>
      {/* Two copies so the loop is seamless */}
      {[0, 1].map((copy) => (
        <div key={copy} className='flex shrink-0 items-center' aria-hidden={copy === 1}>
          {words.map((word) => (
            <span key={word} className='flex items-center whitespace-nowrap font-display text-2xl md:text-3xl'>
              <span className='px-5'>{word}</span>
              <span aria-hidden='true'>✱</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const Marquee = () => (
  <div className='relative -mx-4 overflow-hidden py-10'>
    <Band className='-rotate-2 bg-tomato text-paper' />
    <Band className='absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 bg-lime' reverse />
  </div>
);

export default Marquee;
