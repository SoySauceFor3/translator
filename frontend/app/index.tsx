import TranslationHistory from "@/app/components/TranslationHistory";
import TranslationWindow from "@/app/components/TranslationWindow";
import { Translation } from "@/app/models/Translation";
import React, { useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [history, setHistory] = useState<Translation[]>([]);

  const addToHistory = (translation: Translation) => {
    setHistory((prevHistory) => [...prevHistory, translation]);
  };

  return (
    <View>
      <TranslationWindow addToHistory={addToHistory} />
      <TranslationHistory history={history} />
    </View>
  );
}
