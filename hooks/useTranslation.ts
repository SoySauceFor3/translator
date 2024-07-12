import { Translation } from "@/models/Translation";
import { fetchAudioBase64, fetchTranslation } from "@/services/api/openai";
import { Language } from "@/types";
import { useCallback, useState } from "react";

export const useTranslation = (
  selectedLanguages: Language[],
  addToHistory: (translation: Translation) => void
) => {
  const [translation, setTranslation] = useState<Translation>(
    new Translation()
  );
  const handleTranslateRequest = useCallback(
    async (text: string) => {
      const localTranslation = new Translation({ text: text, TTS: "" });

      const inputTTSPromise = fetchAudioBase64(text).then((audio) => {
        localTranslation.input.TTS = audio;
        setTranslation(
          new Translation(localTranslation.input, localTranslation.translations)
        );
      });

      const translationPromises = selectedLanguages.map(async (language) => {
        const translatedText = await fetchTranslation(text, language);
        const audio = await fetchAudioBase64(translatedText);
        localTranslation.translations.set(language, {
          text: translatedText,
          TTS: audio,
        });
        setTranslation(
          new Translation(
            localTranslation.input,
            new Map(localTranslation.translations)
          )
        );
      });

      await Promise.all([inputTTSPromise, ...translationPromises]);
      addToHistory(localTranslation);
    },
    [selectedLanguages, addToHistory]
  );

  return { translation, handleTranslation: handleTranslateRequest };
};
