import type { Language } from "@/app/models/Language";
import { useState } from "react";

export function useLanguageSelector() {
  const [selectedLanguages, setSelectedLanguages] = useState<Set<Language>>(
    new Set()
  );

  const toggleLanguage = (language: Language) => {
    setSelectedLanguages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(language)) {
        newSet.delete(language);
      } else {
        newSet.add(language);
      }
      return newSet;
    });
  };

  return {
    selectedLanguages,
    toggleLanguage,
  };
}
