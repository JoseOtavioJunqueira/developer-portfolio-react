import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-6 bg-card/70 backdrop-blur-sm border-t border-border">
      <div className="container flex flex-wrap gap-4 justify-between items-center">
        <div className="text-left">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} José Otávio Junqueira. {t("footer.rights")}
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/70 mt-1">
            <span className="text-primary">$</span> {t("footer.built")}
          </p>
        </div>
        <a
          href="#hero"
          aria-label="Back to top"
          className="p-2 rounded-lg border border-primary/30 text-primary transition-all hover:bg-primary/10 hover:-translate-y-1"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};
