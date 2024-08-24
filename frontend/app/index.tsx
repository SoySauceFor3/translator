import History from "@/app/components/History";
import { TranslatorCard } from "@/app/components/TranslatorCard";
import { InputTextProvider } from "@/app/contexts/InputTextContext";
import { RecordHistoryProvider } from "@/app/contexts/RecordHistoryContext";
import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <RecordHistoryProvider>
      <InputTextProvider>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={{ flex: 1 }}>
            <TranslatorCard />
            <History />
          </View>
        </TouchableWithoutFeedback>
      </InputTextProvider>
    </RecordHistoryProvider>
  );
}
