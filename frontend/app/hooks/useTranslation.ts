import { Language } from "@/app/models/Language";
import { Piece, Record } from "@/app/models/Record";
import { useCallback } from "react";

// Determine which API to use
const useFakeApi = process.env.EXPO_PUBLIC_USE_FAKE_API === "true";

const { fetchAudioBase64, fetchTranslation } = useFakeApi
  ? require("@/app/services/fakeApi")
  : require("@/app/services/api/openai");

export const useTranslation = (
  toLanguages: Language[],
  confirmLanguages: Language[],
  onAddNewTranslation: (translation: Record) => void,
  onUpdateTranslation: (translation: Record) => void
) => {
  const handleTranslateRequest = useCallback(
    async (input: string) => {
      const translation = new Record(new Piece(input, "", new Map()));
      onAddNewTranslation(translation);

      // Input TTS
      fetchAudioBase64(input).then((audio: string) => {
        translation.input.TTS = audio;
        onUpdateTranslation(translation);
      });

      // Translations
      toLanguages.forEach(async (toLang) => {
        // Add a empty Piece for the toLang.
        const piece = new Piece("", "", new Map());
        translation.translations.set(toLang, piece);
        onUpdateTranslation(translation);

        // Get translation.
        const translatedText = await fetchTranslation(input, toLang);
        piece.text = translatedText;
        onUpdateTranslation(translation);

        // Get TTS for the translation.
        const audio = await fetchAudioBase64(translatedText);
        piece.TTS = audio;
        onUpdateTranslation(translation);

        for (const confirmLang of confirmLanguages) {
          const confirmation = await fetchTranslation(
            translatedText,
            confirmLang
          );

          piece.confirmations.set(confirmLang, confirmation);
          onUpdateTranslation(translation);
        }
      });
    },
    [toLanguages, confirmLanguages, onAddNewTranslation, onUpdateTranslation]
  );

  return { handleTranslateRequest };
};
