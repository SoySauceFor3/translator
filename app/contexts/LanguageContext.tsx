import type { Language } from "@/app/models/Language";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface LanguageContextType {
  selectedLanguages: Set<Language>;
  toggleLanguageSelection: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<Set<Language>>(
    new Set()
  );

  const toggleLanguageSelection = (language: Language) => {
    setSelectedLanguages((prevSelectedLanguages) => {
      const newSelectedLanguages = new Set(prevSelectedLanguages);
      if (newSelectedLanguages.has(language)) {
        newSelectedLanguages.delete(language);
      } else {
        newSelectedLanguages.add(language);
      }
      return newSelectedLanguages;
    });
  };

  return (
    <LanguageContext.Provider
      value={{ selectedLanguages, toggleLanguageSelection }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
