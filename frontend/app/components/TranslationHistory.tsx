import TranslationItem from "@/app/components/TranslationItem";
import { Translation } from "@/app/models/Translation";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

interface TranslationHistoryProps {
  history: Translation[];
}

export default function TranslationHistory({
  history,
}: TranslationHistoryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translation History</Text>
      <FlatList
        data={[...history].reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TranslationItem item={item} isFocused={false} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    maxHeight: Dimensions.get("window").height / 2.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
