import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items = [],
  activeHref = "",
  className = "",
  baseColor = "#000000",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#000000",
  theme = "light",
  initialLoadAnimation = false,
  onItemClick,
}) => {
  const containerRef = useRef(null);
  const itemRefs = useRef({});
  const [hoveredHref, setHoveredHref] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState(null);

  const currentHref = hoveredHref || activeHref || items[0]?.href || "";

  useLayoutEffect(() => {
    if (!currentHref) {
      setIndicatorStyle(null);
      return;
    }

    const target = itemRefs.current[currentHref];
    const container = containerRef.current;

    if (!target || !container) {
      setIndicatorStyle(null);
      return;
    }

    setIndicatorStyle({
      width: target.offsetWidth,
      height: target.offsetHeight,
      x: target.offsetLeft,
      y: target.offsetTop,
    });
  }, [currentHref, items]);

  useEffect(() => {
    const handleResize = () => {
      const target = itemRefs.current[currentHref];
      if (!target) {
        return;
      }

      setIndicatorStyle({
        width: target.offsetWidth,
        height: target.offsetHeight,
        x: target.offsetLeft,
        y: target.offsetTop,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentHref]);

  return (
    <div className={`flex items-center gap-6 ${className}`.trim()}>
      {logo ? (
        <img src={logo} alt={logoAlt} className='h-10 w-10 object-contain' />
      ) : null}

      <div
        ref={containerRef}
        className='relative hidden sm:flex items-center rounded-full border border-white/15 px-2 py-2 backdrop-blur-md'
        style={{
          background: theme === "light" ? "rgba(255, 255, 255, 0.08)" : baseColor,
        }}
        onMouseLeave={() => setHoveredHref("")}
      >
        {indicatorStyle ? (
          <span
            className={`absolute rounded-full transition-all duration-300 ${
              initialLoadAnimation ? "opacity-100" : ""
            }`}
            style={{
              left: indicatorStyle.x,
              top: indicatorStyle.y,
              width: indicatorStyle.width,
              height: indicatorStyle.height,
              background: pillColor,
            }}
          />
        ) : null}

        {items.map((item) => {
          const isActive = currentHref === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              ref={(node) => {
                itemRefs.current[item.href] = node;
              }}
              onMouseEnter={() => setHoveredHref(item.href)}
              onClick={() => onItemClick?.(item.href)}
              className='relative z-10 rounded-full px-5 py-2 text-[16px] font-semibold transition-colors duration-200'
              style={{
                color: isActive ? pillTextColor : hoveredPillTextColor,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PillNav;
