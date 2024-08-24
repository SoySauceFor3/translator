import TranslationHistory from "@/app/components/TranslationHistory";
import { TranslatorCard } from "@/app/components/TranslatorCard";
import { RecordHistoryProvider } from "@/app/contexts/RecordHistoryContext";
import React from "react";
import { View } from "react-native";

export default function Index() {
  return (
    <RecordHistoryProvider>
      <View>
        <TranslatorCard />
        <TranslationHistory />
      </View>
    </RecordHistoryProvider>
  );
}
