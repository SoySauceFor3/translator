import InputSection from "@/app/components/TranslatorCard//InputSection";
import LanguageSelector from "@/app/components/TranslatorCard/LanguageSelector";
import { useLanguageSelector } from "@/app/hooks/useLanguageSelector";
import { useLanguageStorage } from "@/app/hooks/useLanguageStorage";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Translation } from "@/app/models/Translation";
import React, { useState } from "react";
import { View } from "react-native";

interface TranslatorCardProps {
  addToHistory: (translation: Translation) => void;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({ addToHistory }) => {
  const [inputText, setInputText] = useState("");

  // NOTE: the conversation mode will be considered in the future, and by then there will be a fromLanguages --- which will actually be "left / right languages".
  const {
    languages: toLanguages,
    handleLanguageToggle: handleToLanguageToggle,
  } = useLanguageStorage("toLanguages");
  const {
    languages: confirmLanguages,
    handleLanguageToggle: handleConfirmLanguageToggle,
  } = useLanguageSelector();

  const { handleTranslateRequest } = useTranslation(
    Array.from(toLanguages)
      .filter(([_, isSelected]) => isSelected)
      .map(([lang]) => lang),
    Array.from(confirmLanguages).map(([lang]) => lang),
    addToHistory
  );

  const handleTranscription = (transcription: string) => {
    setInputText(transcription);
  };

  return (
    <View className="h-3/7 bg-background p-6 rounded-2xl shadow-lg">
      <LanguageSelector
        availableLanguages={toLanguages}
        onLanguageToggle={handleToLanguageToggle}
        type="to"
      />
      <InputSection
        inputText={inputText}
        setInputText={setInputText}
        handleTranslateRequest={handleTranslateRequest}
        handleTranscription={handleTranscription}
      />
    </View>
  );
};

export default TranslatorCard;
