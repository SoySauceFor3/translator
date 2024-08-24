import { Language } from "@/app/models/Language";
import { Record as RecordModel } from "@/app/models/Record";
import React from "react";
import { View } from "react-native";
import Entry from "./Entry";
import InputSection from "./InputSection";

interface RecordProps {
  record: RecordModel;
  isFocused: boolean;
  confirmLang: Language | undefined;
  setConfirmLang: (lang: Language | undefined) => void;
}

const Record: React.FC<RecordProps> = ({
  record,
  isFocused,
  confirmLang,
  setConfirmLang,
}) => {
  return (
    <View
      className={`mb-6 p-5 rounded-xl ${
        isFocused
          ? "bg-surface shadow-lg"
          : "bg-background border-2 border-primary-light"
      }`}
    >
      <InputSection item={record} isFocused={isFocused} />
      {Array.from(record.translations.entries()).map(
        ([toLang, translation], entryIdx) => (
          <Entry
            key={`${record.id}-${toLang.id}`}
            recordId={record.id}
            toLang={toLang}
            piece={translation}
            isFocused={isFocused}
            confirmLang={confirmLang}
            setConfirmLang={setConfirmLang}
          />
        )
      )}
    </View>
  );
};

export default Record;
