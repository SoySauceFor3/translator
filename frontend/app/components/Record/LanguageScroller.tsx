import { Language } from "@/app/models/Language";
import React from "react";
import { Text, View } from "react-native";

interface LanguageScrollerProps {
  confirmations: Map<Language, string> | undefined;
  selectedLang: Language | null;
}

export default function LanguageScroller({
  confirmations,
  selectedLang,
}: LanguageScrollerProps) {
  return (
    <View className="flex-row overflow-hidden w-[100px]">
      {Array.from(confirmations || []).map(([lang, _]: [Language, string]) => (
        <View
          key={lang.acronym}
          className={`p-2 w-[60px] ${
            selectedLang === lang ? "bg-primary-light" : "bg-secondary-light"
          }`}
        >
          <Text>{lang.acronym}</Text>
        </View>
      ))}
    </View>
  );
}
