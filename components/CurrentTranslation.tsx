import { fetchTranslation } from "@/services/api/openai";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { useLanguageContext } from "../contexts/LanguageContext";

export default function CurrentTranslation() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const { selectedLanguages } = useLanguageContext();

  console.log(selectedLanguages);
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
          setTranslation("...loading...");
          fetchTranslation(text).then((translation) => {
            setTranslation(translation);
          });
        }}
        returnKeyType="go"
      />
      <Text style={styles.output}>Translation: {translation}</Text>
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
});
