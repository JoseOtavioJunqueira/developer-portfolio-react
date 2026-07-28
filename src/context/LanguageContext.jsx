import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext(undefined);

const getInitialLanguage = () => {
  const stored = localStorage.getItem("language");
  if (stored === "en" || stored === "pt") return stored;
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
};

// eslint-disable-next-line react/prop-types -- children is a standard React node prop
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"));
  };

  const t = (key) => {
    const value = key
      .split(".")
      .reduce((acc, part) => acc?.[part], translations[language]);
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
