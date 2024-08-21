import { useAudio } from "@/app/hooks/useAudio";
import { Translation } from "@/app/models/Translation";
import React from "react";
import { View } from "react-native";
import Entry from "./Entry";
import InputSection from "./InputSection";

interface TranslationItemProps {
  item: Translation;
  isFocused: boolean;
}

const TranslationItem: React.FC<TranslationItemProps> = ({
  item,
  isFocused,
}) => {
  const { playAudio } = useAudio();

  return (
    <View
      className={`mb-6 p-5 rounded-xl ${
        isFocused
          ? "bg-surface shadow-lg"
          : "bg-background border-2 border-primary-light"
      }`}
    >
      <InputSection item={item} isFocused={isFocused} playAudio={playAudio} />
      {Array.from(item.translations.entries()).map(
        ([toLang, translation], entryIdx) => (
          <Entry
            key={`${toLang.name}-${entryIdx}`}
            toLang={toLang}
            translation={translation}
            entryIdx={entryIdx}
            isFocused={isFocused}
            playAudio={playAudio}
          />
        )
      )}
    </View>
  );
};

export default TranslationItem;
