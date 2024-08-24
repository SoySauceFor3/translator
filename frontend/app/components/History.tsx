import { Record } from "@/app/components/Record";
import { useRecordHistory } from "@/app/contexts/RecordHistoryContext";
import { useConfirmLang } from "@/app/hooks/useConfirmLanguage";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function History() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { confirmLang, setConfirmLang } = useConfirmLang();

  const { history } = useRecordHistory();

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
        data={[...history].reverse()} // So the newest item is at the top, and it is a copy of history.
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
