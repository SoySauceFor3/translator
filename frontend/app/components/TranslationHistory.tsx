import { Record } from "@/app/components/Record";
import { useConfirmLang } from "@/app/hooks/useConfirmLanguage";
import { Record as RecordModel } from "@/app/models/Record";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

interface TranslationHistoryProps {
  history: RecordModel[];
}

export default function TranslationHistory({
  history,
}: TranslationHistoryProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { confirmLang, setConfirmLang } = useConfirmLang();

  useEffect(() => {
    if (history.length > 0) {
      setFocusedIndex(0); // Focus on the newest item (index 0 after reversal)
    }
  }, [history]);

  const handleItemPress = (index: number) => {
    setFocusedIndex(index === focusedIndex ? null : index);
  };

  return (
    <View className="w-full p-4 max-h-[53vh]">
      <FlatList
        data={[...history].reverse()}
        keyExtractor={(record, _) => record.id}
        renderItem={({ item: record, index }) => (
          <TouchableOpacity onPress={() => handleItemPress(index)}>
            <Record
              record={record}
              isFocused={index === focusedIndex}
              confirmLang={confirmLang}
              setConfirmLang={setConfirmLang}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}
