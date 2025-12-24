import Lenis from "lenis";
import React, { useEffect, useRef } from "react";

const LenisScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1020) return
      const lenis = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: true,
        direction: "vertical",
        gestureDirection: "vertical",
        wheelMultiplier: 0.8,
        touchMultiplier: 1.2,
        infinite: false,
      });

      lenis.current = lenis;
      window.lenis = lenis;

      // ✅ Restore scroll position if available
      const savedY = localStorage.getItem("scrollY");
      if (savedY) {
        lenis.scrollTo(parseFloat(savedY), { immediate: true });
      }

      // ✅ Save scroll position on scroll
      lenis.on("scroll", ({ scroll }) => {
        localStorage.setItem("scrollY", scroll.toString());
      });

      // Start RAF
      const raf = (time) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };

      rafRef.current = requestAnimationFrame(raf);

    return () => {
      clearTimeout(timeout);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <>{children}</>;
};

export default LenisScroll;
