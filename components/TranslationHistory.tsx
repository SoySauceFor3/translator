import { playAudio } from "@/hooks/playAudio"; // Import the playAudio function
import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface TranslationHistoryProps {
  history: {
    text: string;
    translations: Map<string, string>;
    textAudio: string;
    translationAudios: Map<string, string>;
  }[];
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
            <View style={styles.entryContainer}>
              <Text style={styles.historyText}>Input: {item.text}</Text>
              <TouchableOpacity
                onPress={() => playAudio(item.textAudio)}
                style={styles.audioButton}
              >
                <Icon name="volume-up" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            {Array.from(item.translations.entries()).map(
              ([language, translation]) => (
                <View key={language} style={styles.entryContainer}>
                  <Text style={styles.historyTranslation}>
                    {language}: {translation}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      playAudio(item.translationAudios.get(language) || "")
                    }
                    style={styles.audioButton}
                  >
                    <Icon name="volume-up" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
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
    maxHeight: Dimensions.get("window").height / 2.5,
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
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  audioButton: {
    padding: 8,
  },
});
