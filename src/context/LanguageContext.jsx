import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext(undefined);

// English is the default language. Portuguese only applies if the visitor chose it.
const getInitialLanguage = () => {
  try {
    return localStorage.getItem("language") === "pt" ? "pt" : "en";
  } catch {
    return "en";
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch {
      /* storage unavailable */
    }
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

  // The CV matches the selected language.
  const cvUrl =
    language === "pt"
      ? "/cv/Jose_Otavio_Junqueira_Ramos_Curriculo_PT-BR.pdf"
      : "/cv/Jose_Otavio_Junqueira_Ramos_Resume_EN.pdf";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, cvUrl }}>
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
