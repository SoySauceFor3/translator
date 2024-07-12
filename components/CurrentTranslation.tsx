import { playAudio } from "@/hooks/playAudio";
import { Translation } from "@/models/Translation";
import { fetchAudioBase64, fetchTranslation } from "@/services/fakeApi";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLanguageContext } from "../contexts/LanguageContext";

interface CurrentTranslationProps {
  addToHistory: (translation: Translation) => void;
}

export default function CurrentTranslation({
  addToHistory,
}: CurrentTranslationProps) {
  const [translation, setTranslation] = useState<Translation>(
    new Translation()
  );
  let localTranslation = new Translation();

  const [loading, setLoading] = useState<Map<string, boolean>>(new Map());
  const { selectedLanguages } = useLanguageContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter some text:</Text>
      <TextInput
        style={styles.input}
        value={translation.input.text}
        onChangeText={(text: string) => {
          // input.text
          localTranslation = new Translation();
          localTranslation.input.text = text;
          setTranslation(localTranslation);
        }}
        onSubmitEditing={() => {
          // input.text
          localTranslation = new Translation();
          localTranslation.input.text = translation.input.text;

          // input.TTS
          const inputTTSPromise = fetchAudioBase64(translation.input.text).then(
            (audio) => {
              localTranslation.input.TTS = audio;
              setTranslation(localTranslation);
            }
          );

          const newLoading = new Map();
          selectedLanguages.forEach((language) => {
            newLoading.set(language.acronym, true);
          });
          setLoading(newLoading);

          // translations
          const translationPromises = Array.from(selectedLanguages).map(
            (language) =>
              fetchTranslation(translation.input.text, language).then(
                (translation) => {
                  fetchAudioBase64(translation).then((audio) => {
                    localTranslation.translations.set(language, {
                      text: translation,
                      TTS: audio,
                    });
                    setTranslation(localTranslation);
                  });
                  setLoading((prevLoading) => {
                    return new Map(prevLoading).set(language.acronym, false);
                  });
                }
              )
          );

          Promise.all(translationPromises.concat(inputTTSPromise)).then(() => {
            addToHistory(localTranslation);
          });
        }}
        returnKeyType="go"
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
  output: {
    fontSize: 18,
    marginTop: 16,
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
