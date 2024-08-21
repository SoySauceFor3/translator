import InputSection from "@/app/components/TranslatorCard//InputSection";
import LanguageSelector from "@/app/components/TranslatorCard/LanguageSelector";
import { useLanguageStorage } from "@/app/hooks/useLanguageStorage";
import { useTranslation } from "@/app/hooks/useTranslation";
import { getLanguageFromCode, Language } from "@/app/models/Language";
import { Translation } from "@/app/models/Translation";
import * as Localization from "expo-localization";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

interface TranslatorCardProps {
  onAddNewTranslation: (translation: Translation) => void;
  onUpdateTranslation: (translation: Translation) => void;
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
  } = useLanguageStorage("toLanguages");

  useEffect(() => {
    const initializeConfirmLanguages = () => {
      const newConfirmLanguages = new Map<Language, boolean>();
      for (const locale of Localization.getLocales()) {
        const languageCode = locale.languageCode;
        if (languageCode !== null) {
          const language = getLanguageFromCode(languageCode);
          if (language) {
            newConfirmLanguages.set(language, true);
          }
        }
      }
      setConfirmLanguages(newConfirmLanguages);
    };

    initializeConfirmLanguages();
  }, []);

  const memoizedOnAddNewTranslation = useCallback(
    (translation: Translation) => {
      onAddNewTranslation(translation);
    },
    [onAddNewTranslation]
  );

  const memoizedOnUpdateTranslation = useCallback(
    (translation: Translation) => {
      onUpdateTranslation(translation);
    },
    [onUpdateTranslation]
  );

  const { handleTranslateRequest } = useTranslation(
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
