import { useAudio } from "@/hooks/useAudio";
import { Translation } from "@/models/Translation";
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
  history: Translation[];
}

export default function TranslationHistory({
  history,
}: TranslationHistoryProps) {
  const { playAudio } = useAudio();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translation History</Text>
      <FlatList
        data={history.reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View style={styles.entryContainer}>
              <Text style={styles.historyText}>Input: {item.input.text}</Text>
              <TouchableOpacity
                onPress={() => playAudio(item.input.TTS)}
                style={styles.audioButton}
              >
                <Icon name="volume-up" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            {Array.from(item.translations.entries()).map(
              ([language, translation]) => (
                <View key={language.acronym} style={styles.entryContainer}>
                  <Text style={styles.historyTranslation}>
                    {language.acronym}: {translation.text}
                  </Text>
                  <TouchableOpacity
                    onPress={() => playAudio(translation.TTS)}
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
