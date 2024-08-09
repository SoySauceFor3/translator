import type { Language } from "@/app/models/Language";
import availableLanguages from "@/assets/languages.json";
import { useState } from "react";
export function useLanguageSelector() {
  const [languages, setLanguages] = useState<Map<Language, boolean>>(
    new Map(availableLanguages.map((lang) => [lang, false]))
  );

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
  };
}
