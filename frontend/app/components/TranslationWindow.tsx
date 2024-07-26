import CurrentTranslation from "@/app/components/CurrentTranslation";
import LanguageSelection from "@/app/components/LanguageSelection";
import { useLanguageSelector } from "@/app/hooks/useLanguageSelector";
import { Translation } from "@/app/models/Translation";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
}

export default function TranslationWindow({
  addToHistory,
}: CurrentTranslationProps) {
  const { selectedLanguages: toLanguages, toggleLanguage: toggleToLanguage } =
    useLanguageSelector();
  const {
    selectedLanguages: fromLanguages,
    toggleLanguage: toggleFromLanguage,
  } = useLanguageSelector();
  return (
    <View style={styles.translationWindow}>
      <LanguageSelection
        selectedLanguages={fromLanguages}
        toggleLanguageSelection={toggleFromLanguage}
        type="from"
      />
      <LanguageSelection
        selectedLanguages={toLanguages}
        toggleLanguageSelection={toggleToLanguage}
        type="to"
      />
      <CurrentTranslation
        addToHistory={addToHistory}
        selectedToLanguages={toLanguages}
        selectedFromLanguages={fromLanguages}
      />
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;
const translationWindowHeight = (3 / 5) * windowHeight;

const styles = StyleSheet.create({
  translationWindow: {
    height: translationWindowHeight,
  },
});
