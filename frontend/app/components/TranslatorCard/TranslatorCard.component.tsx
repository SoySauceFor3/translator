import CurrentTranslation from "@/app/components/TranslatorCard/CurrentTranslation";
import LanguageSelector from "@/app/components/TranslatorCard/LanguageSelector";
import { useLanguageSelector } from "@/app/hooks/useLanguageSelector";
import { Translation } from "@/app/models/Translation";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
}

const TranslatorCard: React.FC<CurrentTranslationProps> = ({
  addToHistory,
}) => {
  const {
    languages: toLanguages,
    handleLanguageToggle: handleToLanguageToggle,
  } = useLanguageSelector();

  // NOTE: the conversation mode will be considered in the future, and by then there will be a fromLanguages --- which will actually be "left / right languages".
  return (
    <View style={styles.translationWindow}>
      <LanguageSelector
        availableLanguages={toLanguages}
        onLanguageToggle={handleToLanguageToggle}
        type="to"
      />
      <CurrentTranslation
        addToHistory={addToHistory}
        selectedToLanguages={toLanguages}
      />
    </View>
  );
};
export default TranslatorCard;
const windowHeight = Dimensions.get("window").height;
const translationWindowHeight = (3 / 5) * windowHeight;

const styles = StyleSheet.create({
  translationWindow: {
    height: translationWindowHeight,
  },
});
