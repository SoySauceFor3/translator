import { playAudio } from "@/hooks/playAudio";
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
  addToHistory: (
    input: string,
    translations: Map<string, string>,
    inputAudio: string,
    translationAudios: Map<string, string>
  ) => void;
}

export default function CurrentTranslation({
  addToHistory,
}: CurrentTranslationProps) {
  const [input, setInput] = useState("");
  const [inputTTS, setInputTTS] = useState("");
  const [translations, setTranslations] = useState<Map<string, string>>(
    new Map()
  );
  const [translationAudios, setTranslationAudios] = useState<
    Map<string, string>
  >(new Map());
  const [loading, setLoading] = useState<Map<string, boolean>>(new Map());
  const { selectedLanguages } = useLanguageContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter some text:</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(text: React.SetStateAction<string>) => {
          setInput(text);
        }}
        onSubmitEditing={() => {
          setInputTTS("");
          setTranslationAudios(new Map());

          let localInputTTS = "";
          const inputTTSPromise = fetchAudioBase64(input).then((audio) => {
            localInputTTS = audio;
            setInputTTS(audio);
          });

          const newLoading = new Map();
          selectedLanguages.forEach((language) => {
            newLoading.set(language.acronym, true);
          });
          setLoading(newLoading);
          setTranslations(new Map());

          const localTranslations = new Map();
          const localTranslationAudios = new Map();
          const translationPromises = Array.from(selectedLanguages).map(
            (language) =>
              fetchTranslation(input, language).then((translation) => {
                localTranslations.set(language.acronym, translation);
                setTranslations((prevTranslations) => {
                  return new Map(prevTranslations).set(
                    language.acronym,
                    translation
                  );
                });
                fetchAudioBase64(translation).then((audio) => {
                  localTranslationAudios.set(language.acronym, audio);
                  setTranslationAudios((prevTranslationsAudio) => {
                    return new Map(prevTranslationsAudio).set(
                      language.acronym,
                      audio
                    );
                  });
                });
                setLoading((prevLoading) => {
                  return new Map(prevLoading).set(language.acronym, false);
                });
              })
          );

          Promise.all(translationPromises.concat(inputTTSPromise)).then(() => {
            addToHistory(
              input,
              localTranslations,
              localInputTTS,
              localTranslationAudios
            );
          });
        }}
        returnKeyType="go"
      />
      {inputTTS && (
        <TouchableOpacity
          onPress={() => playAudio(inputTTS)}
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
                : translations.get(language.acronym) || "waiting for input"}
            </Text>
            <TouchableOpacity
              onPress={() =>
                playAudio(translationAudios.get(language.acronym) || "")
              }
              disabled={!translationAudios.get(language.acronym)}
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
