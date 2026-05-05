import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export const CustomCursor = () => {
  const { isTouch } = useIsMobile();

  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 300, damping: 25, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 25, mass: 0.8 });

  const dotX = useSpring(cursorX, { stiffness: 600, damping: 20, mass: 0.3 });
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 20, mass: 0.3 });

  const ringScale = useSpring(1, { stiffness: 400, damping: 30, mass: 0.5 });
  const dotScale = useSpring(1, { stiffness: 400, damping: 30, mass: 0.5 });
  const ringOpacity = useSpring(0.6, { stiffness: 400, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (isPointer) {
      ringScale.set(2.5);
      dotScale.set(0);
      ringOpacity.set(0.3);
    } else if (isClicking) {
      ringScale.set(0.8);
      dotScale.set(0.5);
      ringOpacity.set(0.6);
    } else {
      ringScale.set(1);
      dotScale.set(1);
      ringOpacity.set(0.6);
    }
  }, [isPointer, isClicking, dotScale, ringOpacity, ringScale]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    const updateCursor = () => {
      const xVal = cursorX.get();
      const yVal = cursorY.get();
      const el = document.elementFromPoint(xVal, yVal);
      if (!el) return;

      const interactiveEl = 
        (el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "INPUT" || el.tagName === "TEXTAREA") ? el :
        el.closest("button, a, [role='button'], [data-cursor-pointer]");

      setIsPointer(!!interactiveEl);
      setHoveredRect(interactiveEl ? interactiveEl.getBoundingClientRect() : null);
    };

    const interval = setInterval(updateCursor, 50);
    return () => clearInterval(interval);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleBlur = () => setIsVisible(false);
    const handleFocus = () => setIsVisible(true);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return isVisible && !isTouch ? (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: dotX,
          top: dotY,
          x: "-50%",
          y: "-50%",
          scale: dotScale,
        }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          scale: ringScale,
          opacity: ringOpacity,
        }}
      >
        <div className="w-6 h-6 rounded-full border border-white/70" />
      </motion.div>

      {isPointer && hoveredRect && (
        <motion.div
          className="fixed pointer-events-none z-[9997] mix-blend-difference"
          style={{
            left: hoveredRect.left,
            top: hoveredRect.top,
            width: hoveredRect.width,
            height: hoveredRect.height,
          }}
          initial={{ opacity: 0, borderRadius: "20px" }}
          animate={{ opacity: 1, borderRadius: hoveredRect.height < 40 ? "12px" : "16px" }}
          exit={{ opacity: 0, borderRadius: "20px" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="w-full h-full rounded-lg bg-white/5 border border-white/10" />
        </motion.div>
      )}
    </>
  ) : null;
};
