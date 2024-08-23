import { Record as RecordModel } from "@/app/models/Record";
import React from "react";
import { View } from "react-native";
import Entry from "./Entry";
import InputSection from "./InputSection";

interface RecordProps {
  item: RecordModel;
  isFocused: boolean;
}

const Record: React.FC<RecordProps> = ({ item, isFocused }) => {
  return (
    <View
      className={`mb-6 p-5 rounded-xl ${
        isFocused
          ? "bg-surface shadow-lg"
          : "bg-background border-2 border-primary-light"
      }`}
    >
      <InputSection item={item} isFocused={isFocused} />
      {Array.from(item.translations.entries()).map(
        ([toLang, translation], entryIdx) => (
          <Entry
            key={`${toLang.name}-${entryIdx}`}
            toLang={toLang}
            translation={translation}
            entryIdx={entryIdx}
            isFocused={isFocused}
          />
        )
      )}
    </View>
  );
};

export default Record;
