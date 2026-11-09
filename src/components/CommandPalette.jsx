import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const SECTIONS = ["about", "experience", "architecture", "stack", "api", "projects", "contact"];

// Ctrl/Cmd + K command palette. Opened via the "palette:open" window event or the shortcut.
export const CommandPalette = () => {
  const { t, toggleLanguage, cvUrl } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const link = (href, newTab) => () =>
      newTab ? window.open(href, "_blank", "noopener,noreferrer") : (window.location.href = href);
    return [
      ...SECTIONS.map((id) => ({
        group: t("palette.goTo"),
        label: t(`nav.${id}`),
        hint: `#${id}`,
        run: go(id),
      })),
      { group: t("palette.actions"), label: t("palette.cv"), hint: "pdf", run: link(cvUrl, true) },
      { group: t("palette.actions"), label: t("palette.github"), hint: "↗", run: link("https://github.com/JoseOtavioJunqueira", true) },
      { group: t("palette.actions"), label: t("palette.linkedin"), hint: "↗", run: link("https://www.linkedin.com/in/joseotaviojunqueiraramos/", true) },
      { group: t("palette.actions"), label: t("palette.email"), hint: "mailto", run: link("mailto:joseotavio.jr1104@gmail.com") },
      { group: t("palette.actions"), label: t("palette.language"), hint: "EN/PT", run: toggleLanguage },
    ];
  }, [t, toggleLanguage, cvUrl]);

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const run = (item) => {
    setOpen(false);
    item.run();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && filtered[cursor]) {
      run(filtered[cursor]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] px-4 bg-background/70 backdrop-blur-sm"
      onMouseDown={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-xl border border-primary/40 bg-card shadow-2xl overflow-hidden animate-fade-in opacity-0"
        style={{ boxShadow: "0 0 60px -15px hsl(var(--primary) / 0.5)" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search size={16} className="text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={onInputKey}
            placeholder={t("palette.placeholder")}
            className="w-full py-4 bg-transparent outline-none font-mono text-sm"
          />
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">esc</kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto p-2 text-left">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">{t("palette.empty")}</li>
          )}
          {filtered.map((item, i) => (
            <li key={`${item.group}-${item.label}`}>
              {(i === 0 || filtered[i - 1].group !== item.group) && (
                <p className="px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {item.group}
                </p>
              )}
              <button
                onMouseEnter={() => setCursor(i)}
                onClick={() => run(item)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer",
                  cursor === i ? "bg-primary/15 text-primary" : "text-foreground/90"
                )}
              >
                <span>{item.label}</span>
                <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                  {item.hint}
                  {cursor === i && <CornerDownLeft size={12} />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
