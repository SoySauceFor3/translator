import TranslationHistory from "@/app/components/TranslationHistory";
import { TranslatorCard } from "@/app/components/TranslatorCard";
import { Translation } from "@/app/models/Translation";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [history, setHistory] = useState<Translation[]>([]);
  const onAddNewTranslation = useCallback((translation: Translation) => {
    setHistory((prevHistory) => [...prevHistory, translation]);
  }, []);

  const onUpdateTranslation = useCallback((translation: Translation) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory];
      if (updatedHistory.length > 0) {
        updatedHistory[updatedHistory.length - 1] = translation;
      }
      return updatedHistory;
    });
  }, []);

  return (
    <View>
      <TranslatorCard
        onAddNewTranslation={onAddNewTranslation}
        onUpdateTranslation={onUpdateTranslation}
      />
      <TranslationHistory history={history} />
    </View>
  );
}
