import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-1 p-2 rounded-full transition-colors duration-300",
        "hover:bg-secondary/50 focus:outline-hidden"
      )}
      aria-label={language === "en" ? "Switch to Portuguese" : "Mudar para inglês"}
    >
      <Languages className="h-5 w-5 text-foreground/80" />
      <span className="text-xs font-medium text-foreground/80">
        {language.toUpperCase()}
      </span>
    </button>
  );
};
