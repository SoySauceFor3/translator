import type { Language } from "@/app/models/Language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useLanguageSelector } from "./useLanguageSelector";

export const useLanguageStorage = (
  storageKey: string,
  availableLanguages: Language[]
) => {
  const { languages, handleLanguageToggle, setLanguages } =
    useLanguageSelector(availableLanguages);

  useEffect(() => {
    loadSavedLanguages();
  }, [availableLanguages]);

  useEffect(() => {
    saveLanguages();
  }, [languages]);

  const loadSavedLanguages = async () => {
    try {
      const savedLanguages = await AsyncStorage.getItem(storageKey);
      if (savedLanguages) {
        const parsedLanguages = JSON.parse(savedLanguages);
        const newLanguages = new Map(
          availableLanguages.map((lang) => [lang, false])
        );
        parsedLanguages.forEach(
          ([savedLang, isSelected]: [Language, boolean]) => {
            const matchingLang = availableLanguages.find(
              (lang) => lang.id === savedLang.id
            );
            if (matchingLang) {
              newLanguages.set(matchingLang, isSelected);
            }
          }
        );
        setLanguages(newLanguages);
      }
    } catch (error) {
      console.error(`Error loading languages for ${storageKey}:`, error);
    }
  };

  const saveLanguages = async () => {
    try {
      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(Array.from(languages))
      );
    } catch (error) {
      console.error(`Error saving languages for ${storageKey}:`, error);
    }
  };

  return { languages, handleLanguageToggle };
};
