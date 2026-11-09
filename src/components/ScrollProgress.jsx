import { useEffect, useRef } from "react";

export const ScrollProgress = () => {
  const ref = useRef(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${pct})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50 pointer-events-none">
      <div
        ref={ref}
        className="h-full origin-left bg-linear-to-r from-primary to-accent"
        style={{ transform: "scaleX(0)", boxShadow: "0 0 12px hsl(var(--primary))" }}
      />
    </div>
  );
};
