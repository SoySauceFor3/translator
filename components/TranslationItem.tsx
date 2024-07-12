import { useAudio } from "@/hooks/useAudio";
import { Translation } from "@/models/Translation";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface TranslationItemProps {
  item: Translation;
}

export default function TranslationItem({ item }: TranslationItemProps) {
  const { playAudio } = useAudio();

  return (
    <View style={styles.translation}>
      <View style={styles.entryContainer}>
        <Text style={styles.inputText}>Input: {item.input.text}</Text>
        <TouchableOpacity
          onPress={() => playAudio(item.input.TTS)}
          style={styles.audioButton}
        >
          <Icon name="volume-up" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {Array.from(item.translations.entries()).map(
        ([language, translation]) => (
          <View key={language.acronym} style={styles.entryContainer}>
            <Text style={styles.translationText}>
              {language.acronym}: {translation.text}
            </Text>
            <TouchableOpacity
              onPress={() => playAudio(translation.TTS)}
              style={styles.audioButton}
            >
              <Icon name="volume-up" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  audioButton: {
    padding: 8,
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    padding: 16,
    maxHeight: Dimensions.get("window").height / 2.5,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  translation: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  translationText: {
    fontSize: 14,
    marginLeft: 8,
  },
});
