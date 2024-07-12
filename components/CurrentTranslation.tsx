import { Translation } from "@/models/Translation";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useLanguageContext } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import TranslationItem from "./TranslationItem";

interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
}

export default function CurrentTranslation({
  addToHistory,
}: CurrentTranslationProps) {
  const [inputText, setInputText] = useState("");
  const { selectedLanguages } = useLanguageContext();
  const { translation, handleTranslation: handleTranslateRequest } =
    useTranslation(Array.from(selectedLanguages), addToHistory);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter some text:</Text>
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
