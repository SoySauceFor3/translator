import CurrentTranslation from "@/components/CurrentTranslation";
import LanguageSelection from "@/components/LanguageSelection";
import { Translation } from "@/models/Translation"; // Updated import
import React from "react";

import { Dimensions, StyleSheet, View } from "react-native";

interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
}

export default function TranslationWindow({
  addToHistory,
}: CurrentTranslationProps) {
  return (
    <View style={styles.translationWindow}>
      <LanguageSelection />
      <CurrentTranslation addToHistory={addToHistory} />
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
