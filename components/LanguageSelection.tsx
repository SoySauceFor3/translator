import languages from "@/assets/languages.json";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { Language } from "@/types";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function LanguageSelection() {
  const { selectedLanguages, toggleLanguageSelection } = useLanguageContext();

  return (
    <View>
      <FlatList
        data={languages as Language[]}
        keyExtractor={(item) => item.language}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: selectedLanguages.has(item)
                ? "lightblue"
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
