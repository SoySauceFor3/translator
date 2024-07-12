import CurrentTranslation from "@/components/CurrentTranslation";
import LanguageSelection from "@/components/LanguageSelection";
import TranslationHistory from "@/components/TranslationHistory";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Translation } from "@/models/Translation";
import React, { useState } from "react";

export default function Index() {
  const [history, setHistory] = useState<Translation[]>([]);

  const addToHistory = (translation: Translation) => {
    setHistory((prevHistory) => [...prevHistory, translation]);
  };

  return (
    <LanguageProvider>
      <TranslationHistory history={history} />
      <LanguageSelection />
      <CurrentTranslation addToHistory={addToHistory} />
    </LanguageProvider>
  );
}
