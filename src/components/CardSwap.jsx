import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useState,
} from "react";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`card-swap__card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const CardSwap = ({
  width = 500,
  height = 400,
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = useMemo(
    () => Children.toArray(children).filter((child) => isValidElement(child)),
    [children]
  );

  const advance = () => {
    setActiveIndex((current) => (current + 1) % cards.length);
  };

  return (
    <div
      className={`card-swap ${className}`.trim()}
      onClick={advance}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          advance();
        }
      }}
      role='button'
      tabIndex={0}
      aria-label='Cycle experience cards'
      style={{
        width,
        height,
        "--card-swap-distance": `${cardDistance}px`,
        "--card-swap-vertical": `${verticalDistance}px`,
        "--card-swap-skew": `${skewAmount}deg`,
        "--card-swap-ease":
          easing === "elastic"
            ? "cubic-bezier(0.22, 1.2, 0.36, 1)"
            : "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {cards.map((child, index) => {
        const relativeIndex = (index - activeIndex + cards.length) % cards.length;
        const depth = Math.min(relativeIndex, 2);
        const isHidden = relativeIndex > 2;
        const isFront = relativeIndex === 0;
        const skew = isFront ? 0 : depth % 2 === 0 ? -skewAmount : skewAmount;

        return cloneElement(child, {
          className: `${child.props.className || ""} ${
            isHidden ? "card-swap__card--hidden" : ""
          }`.trim(),
          style: {
            ...child.props.style,
            width,
            height,
            transform: `translate3d(${depth * cardDistance}px, ${
              depth * verticalDistance
            }px, 0) scale(${1 - depth * 0.05}) skewY(${skew}deg)`,
            zIndex: cards.length - depth,
            opacity: isHidden ? 0 : 1 - depth * 0.18,
          },
          onClick: (event) => {
            child.props.onClick?.(event);
            onCardClick?.(index);
          },
        });
      })}
    </div>
  );
};

export default CardSwap;
