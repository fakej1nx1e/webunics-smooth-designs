import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const springConfig = { stiffness: 200, damping: 25 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  // Kreis zentriert auf (springX, springY) - 12 ist die Hälfte von 24px
  const circleX = useTransform(springX, v => v - 12);
  const circleY = useTransform(springY, v => v - 12);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
      springX.set(x);
      springY.set(y);
    };

    const updateHoverState = () => {
      const el = document.elementFromPoint(position.x, position.y);
      const interactive =
        el?.tagName === "BUTTON" ||
        el?.tagName === "A" ||
        el?.closest("button") ||
        el?.closest("a");

      if (interactive) {
        setHoveredRect((interactive as HTMLElement).getBoundingClientRect());
      } else {
        setHoveredRect(null);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateHoverState);
    };
  }, [position.x, position.y]);

  return (
    <>
      {/* Punkt - sofort */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x - 2}px, ${position.y - 2}px)`,
        }}
      >
        <div className="w-1 h-1 bg-foreground rounded-full" />
      </div>

      {/* Kreis - mit Delay und zentriert */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: circleX, y: circleY }}
        animate={
          hoveredRect
            ? {
                width: hoveredRect.width,
                height: hoveredRect.height,
                x: hoveredRect.left,
                y: hoveredRect.top,
              }
            : {
                width: 24,
                height: 24,
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full h-full rounded-full border-2 border-foreground/50" />
      </motion.div>
    </>
  );
};
