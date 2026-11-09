import { cn } from "@/lib/utils";

// Card whose border/background light up around the cursor (see .spotlight in index.css).
export const SpotlightCard = ({ children, className, ...props }) => {
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={cn("spotlight rounded-xl border border-border bg-card/80 backdrop-blur-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
};
