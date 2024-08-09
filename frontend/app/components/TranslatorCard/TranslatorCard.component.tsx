import AudioRecorder from "@/app/components/TranslatorCard/AudioRecorder";
import LanguageSelector from "@/app/components/TranslatorCard/LanguageSelector";
import { useLanguageSelector } from "@/app/hooks/useLanguageSelector";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Translation } from "@/app/models/Translation";
import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, TextInput, View } from "react-native";

interface TranslatorCardProps {
  addToHistory: (translation: Translation) => void;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({ addToHistory }) => {
  const [inputText, setInputText] = useState("");
  const {
    languages: toLanguages,
    handleLanguageToggle: handleToLanguageToggle,
  } = useLanguageSelector(); // NOTE: the conversation mode will be considered in the future, and by then there will be a fromLanguages --- which will actually be "left / right languages".

  const { handleTranslateRequest } = useTranslation(
    Array.from(toLanguages)
      .filter(([_, isSelected]) => isSelected)
      .map(([lang]) => lang),
    addToHistory
  );

  const handleTranscription = (transcription: string) => {
    setInputText(transcription);
  };

  return (
    <View style={styles.translationWindow}>
      <LanguageSelector
        availableLanguages={toLanguages}
        onLanguageToggle={handleToLanguageToggle}
        type="to"
      />
      <View style={styles.inputContainer}>
        <AudioRecorder onTranscription={handleTranscription} />
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text: string) => setInputText(text)}
          onSubmitEditing={() => handleTranslateRequest(inputText)}
          returnKeyType="go"
        />
        <Button
          title="Translate"
          onPress={() => handleTranslateRequest(inputText)}
        />
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get("window").height;
const translationWindowHeight = (3 / 5) * windowHeight;

const styles = StyleSheet.create({
  translationWindow: {
    height: translationWindowHeight,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    width: "80%",
    marginBottom: 16,
  },
});

export default TranslatorCard;
