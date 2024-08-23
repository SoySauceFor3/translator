import { Language } from "@/app/models/Language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CONFIRM_LANG_STORAGE_KEY = "confirmLang";

export function useConfirmLang() {
  const [confirmLang, setConfirmLang] = useState<Language | undefined>(
    undefined
  );

  useEffect(() => {
    // Load the saved confirmLang when the hook is first used
    loadConfirmLang();
  }, []);

  useEffect(() => {
    // Save the confirmLang whenever it changes
    if (confirmLang) {
      saveConfirmLang(confirmLang);
    }
  }, [confirmLang]);

  const loadConfirmLang = async () => {
    try {
      const savedLang = await AsyncStorage.getItem(CONFIRM_LANG_STORAGE_KEY);
      if (savedLang) {
        setConfirmLang(JSON.parse(savedLang));
      }
    } catch (error) {
      console.error("Error loading confirm language:", error);
    }
  };

  const saveConfirmLang = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(
        CONFIRM_LANG_STORAGE_KEY,
        JSON.stringify(lang)
      );
    } catch (error) {
      console.error("Error saving confirm language:", error);
    }
  };

  return { confirmLang, setConfirmLang };
}
