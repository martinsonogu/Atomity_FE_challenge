import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

interface CountingNumberProps {
  value: number;
  format: (n: number) => string;
  reducedMotion: boolean;
  className?: string;
}

export function CountingNumber({ value, format, reducedMotion, className = "" }: CountingNumberProps) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => {
        previous.current = value;
      },
    });
    return () => controls.stop();
  }, [value, reducedMotion]);

  return (
    <span className={`tabular-nums ${className}`}>{format(display)}</span>
  );
}
