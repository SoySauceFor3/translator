import CurrentTranslation from "@/components/CurrentTranslation";
import LanguageSelection from "@/components/LanguageSelection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import React from "react";

export default function Index() {
  return (
    <LanguageProvider>
      <LanguageSelection />
      <CurrentTranslation />
    </LanguageProvider>
  );
}
