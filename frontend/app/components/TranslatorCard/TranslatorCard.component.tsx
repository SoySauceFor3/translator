import InputSection from "@/app/components/TranslatorCard//InputSection";
import LanguageSelector from "@/app/components/TranslatorCard/LanguageSelector";
import { useInputText } from "@/app/contexts/InputTextContext";
import { useLanguageStorage } from "@/app/hooks/useLanguageStorage";
import { useTranslator } from "@/app/hooks/useTranslator";
import availableLanguages from "@/assets/languages.json";
import React, { useCallback } from "react";
import { View } from "react-native";

interface TranslatorCardProps {}

const TranslatorCard: React.FC<TranslatorCardProps> = ({}) => {
  const { setInputText } = useInputText();

  // NOTE: the conversation mode will be considered in the future, and by then there will be a fromLanguages --- which will actually be "left / right languages".
  const {
    languages: toLanguages,
    handleLanguageToggle: handleToLanguageToggle,
  } = useLanguageStorage("toLanguages", availableLanguages);

  const { handleTranslateRequest } = useTranslator(
    Array.from(toLanguages)
      .filter(([_, isSelected]) => isSelected)
      .map(([lang]) => lang)
  );

  const handleTranscription = useCallback((transcription: string) => {
    setInputText(transcription);
  }, []);

  return (
    <View className="h-3/7 bg-background p-6 rounded-2xl shadow-lg">
      <LanguageSelector
        availableLanguages={toLanguages}
        onLanguageToggle={handleToLanguageToggle}
        type="to"
      />
      <InputSection
        handleTranslateRequest={handleTranslateRequest}
        handleTranscription={handleTranscription}
      />
    </View>
  );
};

export default TranslatorCard;
