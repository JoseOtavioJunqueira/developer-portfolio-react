import { useLanguage } from "@/context/LanguageContext";

export const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground px-4">
      <h1 className="text-6xl font-bold text-primary">{t("notFound.title")}</h1>
      <p className="text-muted-foreground">{t("notFound.message")}</p>
      <a href="/" className="cosmic-button">
        {t("notFound.backHome")}
      </a>
    </div>
  );
};
