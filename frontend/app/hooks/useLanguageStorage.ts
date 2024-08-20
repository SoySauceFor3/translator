import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useLanguageSelector } from "./useLanguageSelector";

export const useLanguageStorage = (storageKey: string) => {
  const { languages, handleLanguageToggle, setLanguages } =
    useLanguageSelector();

  useEffect(() => {
    loadSavedLanguages();
  }, []);

  useEffect(() => {
    saveLanguages();
  }, [languages]);

  const loadSavedLanguages = async () => {
    try {
      const savedLanguages = await AsyncStorage.getItem(storageKey);
      if (savedLanguages) {
        setLanguages(new Map(JSON.parse(savedLanguages)));
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
