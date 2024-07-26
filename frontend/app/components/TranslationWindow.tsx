import CurrentTranslation from "@/app/components/CurrentTranslation";
import LanguageSelection from "@/app/components/LanguageSelection";
import { Translation } from "@/app/models/Translation"; // Updated import
import React from "react";

import { Dimensions, StyleSheet, View } from "react-native";
import { LanguageProvider } from "../contexts/LanguageContext";

interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
}

export default function TranslationWindow({
  addToHistory,
}: CurrentTranslationProps) {
  return (
    <View style={styles.translationWindow}>
      <LanguageProvider>
        <LanguageSelection />
        <CurrentTranslation addToHistory={addToHistory} />
      </LanguageProvider>
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
