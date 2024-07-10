import { fetchTranslation } from "@/services/api/openai";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { useLanguageContext } from "../contexts/LanguageContext";

export default function CurrentTranslation() {
  const [text, setText] = useState("");
  const [translations, setTranslations] = useState<Map<string, string>>(
    new Map()
  );
  const [loading, setLoading] = useState<Map<string, boolean>>(new Map());
  const { selectedLanguages } = useLanguageContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter some text:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={text}
        onChangeText={(text: React.SetStateAction<string>) => {
          setText(text);
        }}
        onSubmitEditing={() => {
          const newLoading = new Map();
          selectedLanguages.forEach((language) => {
            newLoading.set(language.acronym, true);
          });
          setLoading(newLoading);
          setTranslations(new Map());

          selectedLanguages.forEach((language) => {
            fetchTranslation(text, language).then((translation) => {
              setTranslations((prevTranslations) => {
                const newTranslations = new Map(prevTranslations);
                newTranslations.set(language.acronym, translation);
                return newTranslations;
              });
              setLoading((prevLoading) => {
                const newLoading = new Map(prevLoading);
                newLoading.set(language.acronym, false);
                return newLoading;
              });
            });
          });
        }}
        returnKeyType="go"
      />
      <View style={styles.chartContainer}>
        {Array.from(selectedLanguages).map((language) => (
          <View key={language.acronym} style={styles.chartRow}>
            <Text style={styles.chartColumn}>{language.acronym}</Text>
            <Text style={styles.chartColumn}>
              {loading.get(language.acronym)
                ? "...loading..."
                : translations.get(language.acronym) || "waiting for input"}
            </Text>
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
});
