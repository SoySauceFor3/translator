import CurrentTranslation from "@/components/CurrentTranslation";
import LanguageSelection from "@/components/LanguageSelection";
import TranslationHistory from "@/components/TranslationHistory";
import { LanguageProvider } from "@/contexts/LanguageContext";
import React, { useState } from "react";

export default function Index() {
  const [history, setHistory] = useState<
    {
      text: string;
      translations: Map<string, string>;
      textAudio: string;
      translationAudios: Map<string, string>;
    }[]
  >([]);

  const addToHistory = (
    text: string,
    translations: Map<string, string>,
    textAudio: string,
    translationAudios: Map<string, string>
  ) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { text, translations, textAudio, translationAudios },
    ]);
  };

  return (
    <LanguageProvider>
      <TranslationHistory history={history} />
      <LanguageSelection />
      <CurrentTranslation addToHistory={addToHistory} />
    </LanguageProvider>
  );
}
