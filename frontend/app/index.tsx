import History from "@/app/components/History";
import { TranslatorCard } from "@/app/components/TranslatorCard";
import { InputTextProvider } from "@/app/contexts/InputTextContext";
import { RecordHistoryProvider } from "@/app/contexts/RecordHistoryContext";
import React from "react";

export default function Index() {
  return (
    <RecordHistoryProvider>
      <InputTextProvider>
        <TranslatorCard />
        <History />
      </InputTextProvider>
    </RecordHistoryProvider>
  );
}
