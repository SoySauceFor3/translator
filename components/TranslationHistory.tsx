import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

interface TranslationHistoryProps {
  history: { text: string; translations: Map<string, string> }[];
}

export default function TranslationHistory({
  history,
}: TranslationHistoryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translation History</Text>
      <FlatList
        data={history.slice().reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>Input: {item.text}</Text>
            {Array.from(item.translations.entries()).map(
              ([language, translation]) => (
                <Text key={language} style={styles.historyTranslation}>
                  {language}: {translation}
                </Text>
              )
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    maxHeight: Dimensions.get("window").height / 2.5, // Set max height to half of the screen height
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  historyItem: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  historyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  historyTranslation: {
    fontSize: 14,
    marginLeft: 8,
  },
});
