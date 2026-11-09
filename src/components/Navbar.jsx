import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";

const NAV_ITEMS = ["about", "experience", "architecture", "stack", "api", "projects", "contact"];

export const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const openPalette = () => window.dispatchEvent(new Event("palette:open"));

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/75 backdrop-blur-md border-b border-border" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a className="font-mono text-base font-bold flex items-center gap-1" href="#hero">
          <span className="text-primary">~/</span>
          <span className="text-foreground">jose.otavio</span>
          <span className="text-primary animate-blink">_</span>
        </a>

        <div className="flex items-center gap-1">
          <div className="hidden xl:flex items-center gap-6 mr-4">
            {NAV_ITEMS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "relative font-mono text-xs uppercase tracking-wider transition-colors duration-300 py-1",
                  "after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-primary after:transition-all after:duration-300",
                  activeId === id
                    ? "text-primary after:w-full"
                    : "text-foreground/70 hover:text-primary after:w-0 hover:after:w-full"
                )}
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </div>

          <button
            onClick={openPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 mr-1 rounded-md border border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            aria-label={t("nav.search")}
          >
            <Search size={14} />
            <kbd className="font-mono text-[10px]">Ctrl K</kbd>
          </button>

          <LanguageToggle />
          <ThemeToggle />

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="xl:hidden p-2 text-foreground z-50 cursor-pointer"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 xl:hidden",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center space-y-7 font-mono text-xl">
            {NAV_ITEMS.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-primary mr-2">0{i + 1}.</span>
                {t(`nav.${id}`)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
