import { useEffect, useState } from "react";

const LINES = [
  "[ OK ] Starting jose-otavio.service",
  "[ OK ] Connecting to database ............ connected",
  "[ OK ] Loading routes .................... 6 mounted",
  "[ OK ] Running migrations ................ up to date",
  "[ OK ] Listening on http://localhost:5173",
];

const alreadyBooted = () => {
  try {
    return sessionStorage.getItem("booted") === "1";
  } catch {
    return false;
  }
};

// Short fake "server boot" shown once per session. Click or press any key to skip.
export const BootScreen = () => {
  const [done, setDone] = useState(alreadyBooted);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (done) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }
    const timers = LINES.map((_, i) => setTimeout(() => setShown(i + 1), 250 + i * 260));
    const leave = setTimeout(() => setLeaving(true), 250 + LINES.length * 260 + 350);
    const end = setTimeout(() => finish(), 250 + LINES.length * 260 + 850);

    function finish() {
      try {
        sessionStorage.setItem("booted", "1");
      } catch {
        /* storage unavailable */
      }
      setDone(true);
    }

    const skip = () => {
      setLeaving(true);
      setTimeout(finish, 300);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(leave);
      clearTimeout(end);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center px-6 transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="font-mono text-xs sm:text-sm text-left space-y-1.5 w-full max-w-xl">
        {LINES.slice(0, shown).map((line) => (
          <p key={line} className="text-muted-foreground">
            <span className="text-primary">{line.slice(0, 6)}</span>
            {line.slice(6)}
          </p>
        ))}
        <p className="text-primary">
          <span className="animate-blink">▍</span>
        </p>
      </div>
    </div>
  );
};
