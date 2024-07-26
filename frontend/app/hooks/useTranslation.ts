import { Language } from "@/app/models/Language";
import { Translation } from "@/app/models/Translation";
import { useCallback, useState } from "react";

// Determine which API to use
const useFakeApi = process.env.EXPO_PUBLIC_USE_FAKE_API === "true";

const { fetchAudioBase64, fetchTranslation } = useFakeApi
  ? require("@/app/services/fakeApi")
  : require("@/app/services/api/openai");

export const useTranslation = (
  toLanguages: Language[],
  fromLanguages: Language[],
  onFinishTranslation: (translation: Translation) => void
) => {
  const [translation, setTranslation] = useState<Translation>(
    new Translation()
  );
  const handleTranslateRequest = useCallback(
    async (text: string) => {
      const localTranslation = new Translation({
        text: text,
        TTS: "",
      });

      const inputTTSPromise = fetchAudioBase64(text).then((audio: string) => {
        localTranslation.input.TTS = audio;
        setTranslation(localTranslation);
      });

      const translationPromises = toLanguages.map(async (toLang) => {
        const translatedText = await fetchTranslation(text, toLang);
        const audio = await fetchAudioBase64(translatedText);
        const confirmations = new Map();
        for (const fromLang of fromLanguages) {
          const confirmation = await fetchTranslation(translatedText, fromLang);
          confirmations.set(fromLang, confirmation);
        }
        localTranslation.translations.set(toLang, {
          text: translatedText,
          TTS: audio,
          confirmations: confirmations,
        });
        setTranslation(localTranslation);
      });

      await Promise.all([inputTTSPromise, ...translationPromises]);

      // Generate confirmations.

      onFinishTranslation(localTranslation);
    },
    [toLanguages, onFinishTranslation]
  );

  return { translation, handleTranslateRequest };
};
