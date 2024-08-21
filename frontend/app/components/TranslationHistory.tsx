import { TranslationItem } from "@/app/components/TranslationItem";
import { Translation } from "@/app/models/Translation";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

interface TranslationHistoryProps {
  history: Translation[];
}

export default function TranslationHistory({
  history,
}: TranslationHistoryProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleItemPress(index)}>
            <TranslationItem item={item} isFocused={index === focusedIndex} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}
