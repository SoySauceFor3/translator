import type { Language } from "@/app/models/Language";
import { useEffect, useState } from "react";

export const useLanguageSelector = (availableLanguages: Language[]) => {
  const [languages, setLanguages] = useState<Map<Language, boolean>>(
    new Map(availableLanguages.map((lang) => [lang, false]))
  );

  useEffect(() => {
    setLanguages((prevLanguages) => {
      const newLanguages = new Map(
        availableLanguages.map((lang) => [lang, false])
      );
      prevLanguages.forEach((isSelected, lang) => {
        const matchingLang = Array.from(newLanguages.keys()).find(
          (newLang) => newLang.id === lang.id
        );
        if (matchingLang) {
          newLanguages.set(matchingLang, isSelected);
        }
      });
      return newLanguages;
    });
  }, [availableLanguages]);

  const handleLanguageToggle = (language: Language) => {
    setLanguages((prevLanguages) => {
      const newLanguages = new Map(prevLanguages);
      newLanguages.set(language, !newLanguages.get(language));
      return newLanguages;
    });
  };

  return {
    languages,
    handleLanguageToggle,
    setLanguages,
  };
};
