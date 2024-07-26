import { Language } from "@/app/models/Language";
import languages from "@/assets/languages.json";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface LanguageSelectionProps {
  selectedLanguages: Set<Language>;
  toggleLanguageSelection: (language: Language) => void;
  type: "to" | "from";
}
export default function LanguageSelection({
  selectedLanguages,
  toggleLanguageSelection,
  type,
}: LanguageSelectionProps) {
  return (
    <View>
      <FlatList
        data={languages as Language[]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: selectedLanguages.has(item)
                ? type === "to"
                  ? "lightblue"
                  : "lightgreen"
                : "white",
            }}
            onPress={() => toggleLanguageSelection(item)}
          >
            <Text>{item.acronym}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
