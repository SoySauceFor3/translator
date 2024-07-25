import TranslationHistory from "@/app/components/TranslationHistory";
import TranslationWindow from "@/app/components/TranslationWindow";
import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { Translation } from "@/app/models/Translation";
import React, { useState } from "react";

export default function Index() {
  const [history, setHistory] = useState<Translation[]>([]);

  const addToHistory = (translation: Translation) => {
    setHistory((prevHistory) => [...prevHistory, translation]);
  };

  return (
    <LanguageProvider>
      <TranslationWindow addToHistory={addToHistory} />
      <TranslationHistory history={history} />
    </LanguageProvider>
  );
}
