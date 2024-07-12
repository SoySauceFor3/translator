import TranslationHistory from "@/components/TranslationHistory";
import TranslationWindow from "@/components/TranslationWindow";
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
      <TranslationWindow addToHistory={addToHistory} />
      <TranslationHistory history={history} />
    </LanguageProvider>
  );
}
