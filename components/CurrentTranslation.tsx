import { useAudio } from "@/hooks/useAudio";
import { Translation } from "@/models/Translation";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLanguageContext } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
}

export default function CurrentTranslation({
  addToHistory,
}: CurrentTranslationProps) {
  const [inputText, setInputText] = useState("");
  const { selectedLanguages } = useLanguageContext();
  const {
    translation,
    loading,
    handleTranslation: handleTranslateRequest,
  } = useTranslation(Array.from(selectedLanguages), addToHistory);
  const { playAudio } = useAudio();

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
      {translation.input.TTS && (
        <TouchableOpacity
          onPress={() => playAudio(translation.input.TTS)}
          style={styles.audioButton}
        >
          <Icon name="volume-up" size={20} color="#000" />
        </TouchableOpacity>
      )}
      <View style={styles.chartContainer}>
        {Array.from(selectedLanguages).map((language) => (
          <View key={language.acronym} style={styles.chartRow}>
            <Text style={styles.chartColumn}>{language.acronym}</Text>
            <Text style={styles.chartColumn}>
              {loading.get(language.acronym)
                ? "...loading..."
                : translation.translations.get(language)?.text ||
                  "waiting for input"}
            </Text>
            <TouchableOpacity
              onPress={() =>
                playAudio(translation.translations.get(language)?.TTS || "")
              }
              disabled={!translation.translations.get(language)?.TTS}
              style={styles.audioButton}
            >
              <Icon name="volume-up" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
  chartContainer: {
    width: "100%",
    marginTop: 16,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  chartColumn: {
    flex: 1,
    textAlign: "center",
  },
  audioButton: {
    padding: 8,
  },
});
