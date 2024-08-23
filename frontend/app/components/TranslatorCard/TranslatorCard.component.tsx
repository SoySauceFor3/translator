import InputSection from "@/app/components/TranslatorCard//InputSection";
import LanguageSelector from "@/app/components/TranslatorCard/LanguageSelector";
import { useLanguageStorage } from "@/app/hooks/useLanguageStorage";
import { useTranslator } from "@/app/hooks/useTranslator";
import { Language } from "@/app/models/Language";
import { Record } from "@/app/models/Record";
import availableLanguages from "@/assets/languages.json";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

interface TranslatorCardProps {
  onAddNewTranslation: (translation: Record) => void;
  onUpdateTranslation: (translation: Record) => void;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({
  onAddNewTranslation,
  onUpdateTranslation,
}) => {
  const [inputText, setInputText] = useState("");
  const [confirmLanguages, setConfirmLanguages] = useState<
    Map<Language, boolean>
  >(new Map());

  // NOTE: the conversation mode will be considered in the future, and by then there will be a fromLanguages --- which will actually be "left / right languages".
  const {
    languages: toLanguages,
    handleLanguageToggle: handleToLanguageToggle,
  } = useLanguageStorage("toLanguages", availableLanguages);

  const memoizedOnAddNewTranslation = useCallback(
    (translation: Record) => {
      onAddNewTranslation(translation);
    },
    [onAddNewTranslation]
  );

  const memoizedOnUpdateTranslation = useCallback(
    (translation: Record) => {
      onUpdateTranslation(translation);
    },
    [onUpdateTranslation]
  );

  const { handleTranslateRequest } = useTranslator(
    Array.from(toLanguages)
      .filter(([_, isSelected]) => isSelected)
      .map(([lang]) => lang),
    Array.from(confirmLanguages).map(([lang]) => lang),
    memoizedOnAddNewTranslation,
    memoizedOnUpdateTranslation
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
        inputText={inputText}
        setInputText={setInputText}
        handleTranslateRequest={handleTranslateRequest}
        handleTranscription={handleTranscription}
      />
    </View>
  );
};

export default TranslatorCard;
