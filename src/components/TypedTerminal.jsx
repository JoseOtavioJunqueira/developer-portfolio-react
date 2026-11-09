import { useEffect, useState } from "react";
import { highlightJson } from "@/lib/highlight";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const TerminalWindow = ({ title, children, className = "" }) => (
  <div
    className={`relative rounded-xl border border-border bg-card/90 backdrop-blur-sm overflow-hidden text-left shadow-2xl ${className}`}
    style={{ boxShadow: "0 0 60px -20px hsl(var(--primary) / 0.35)" }}
  >
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/60">
      <span className="w-3 h-3 rounded-full bg-danger/80" />
      <span className="w-3 h-3 rounded-full bg-warn/80" />
      <span className="w-3 h-3 rounded-full bg-primary/80" />
      <span className="ml-3 font-mono text-xs text-muted-foreground truncate">{title}</span>
    </div>
    <div className="relative scanlines">{children}</div>
  </div>
);

// Types commands character by character and prints output lines, looping forever.
// script: [{ kind: "cmd" | "out", text, delay? }]
export const TypedTerminal = ({ script, title, minHeight = 300 }) => {
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(script);
      return;
    }

    const run = async () => {
      while (!cancelled) {
        setLines([]);
        setTyping(null);
        await sleep(500);
        for (const line of script) {
          if (cancelled) return;
          if (line.kind === "cmd") {
            for (let i = 1; i <= line.text.length; i++) {
              setTyping(line.text.slice(0, i));
              await sleep(22 + Math.random() * 38);
              if (cancelled) return;
            }
            await sleep(350);
            if (cancelled) return;
            setTyping(null);
            setLines((prev) => [...prev, line]);
          } else {
            await sleep(line.delay ?? 70);
            if (cancelled) return;
            setLines((prev) => [...prev, line]);
          }
        }
        await sleep(5000);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [script]);

  return (
    <TerminalWindow title={title}>
      <pre
        className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap break-words"
        style={{ minHeight }}
      >
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <div key={i}>
              <span className="text-primary">❯ </span>
              <span className="text-foreground">{line.text}</span>
            </div>
          ) : (
            <div key={i} className="text-muted-foreground">
              {highlightJson(line.text)}
            </div>
          )
        )}
        {typing !== null && (
          <div>
            <span className="text-primary">❯ </span>
            <span className="text-foreground">{typing}</span>
            <span className="animate-blink text-primary">▍</span>
          </div>
        )}
        {typing === null && (
          <div>
            <span className="text-primary">❯ </span>
            <span className="animate-blink text-primary">▍</span>
          </div>
        )}
      </pre>
    </TerminalWindow>
  );
};
