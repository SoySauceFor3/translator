import { Translation } from "@/app/models/Translation";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useTranslation } from "../hooks/useTranslation";
import { Language } from "../models/Language";
import AudioRecorder from "./AudioRecorder";
import TranslationItem from "./TranslationItem";

interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
  selectedToLanguages: Map<Language, boolean>;
}

export default function CurrentTranslation({
  addToHistory,
  selectedToLanguages,
}: CurrentTranslationProps) {
  const [inputText, setInputText] = useState("");

  const { translation, handleTranslateRequest } = useTranslation(
    Array.from(selectedToLanguages)
      .filter(([_, isSelected]) => isSelected)
      .map(([lang]) => lang),
    addToHistory
  );

  const handleTranscription = (transcription: string) => {
    setInputText(transcription);
  };

  return (
    <View style={styles.container}>
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
      <TranslationItem item={translation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
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
