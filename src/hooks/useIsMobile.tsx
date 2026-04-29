import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < breakpoint);
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return { isMobile, isTouch };
};
