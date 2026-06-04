import { useEffect, useMemo, useState } from "react";

const TextType = ({
  text,
  texts,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  ...props
}) => {
  const textArray = useMemo(() => {
    const source = texts ?? text;

    if (Array.isArray(source)) {
      return source;
    }

    return source ? [source] : [];
  }, [text, texts]);

  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!textArray.length) {
      return undefined;
    }

    const currentText = textArray[currentTextIndex];
    let timeout = initialDelay;

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);

        if (!loop && currentTextIndex === textArray.length - 1) {
          return undefined;
        }

        setCurrentTextIndex((index) => (index + 1) % textArray.length);
        setCurrentCharIndex(0);
        return undefined;
      }

      timeout = deletingSpeed;
    } else if (currentCharIndex < currentText.length) {
      timeout = typingSpeed;
    } else {
      if (!loop && currentTextIndex === textArray.length - 1) {
        return undefined;
      }

      timeout = pauseDuration;
    }

    const timer = window.setTimeout(() => {
      if (isDeleting) {
        setDisplayedText((value) => value.slice(0, -1));
        return;
      }

      if (currentCharIndex < currentText.length) {
        setDisplayedText(currentText.slice(0, currentCharIndex + 1));
        setCurrentCharIndex((value) => value + 1);
        return;
      }

      setIsDeleting(true);
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [
    currentCharIndex,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    initialDelay,
    isDeleting,
    loop,
    pauseDuration,
    textArray,
    typingSpeed,
  ]);

  if (!textArray.length) {
    return null;
  }

  return (
    <Component className={`text-type ${className}`.trim()} {...props}>
      <span className='text-type__content'>{displayedText}</span>
      {showCursor ? (
        <span
          className={`text-type__cursor ${cursorClassName}`.trim()}
          style={{ animationDuration: `${cursorBlinkDuration}s` }}
        >
          {cursorCharacter}
        </span>
      ) : null}
    </Component>
  );
};

export default TextType;
