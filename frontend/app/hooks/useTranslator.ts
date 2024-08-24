import { useRecordHistory } from "@/app/contexts/RecordHistoryContext";
import { useLanguages } from "@/app/hooks/useLanguages";
import { Language } from "@/app/models/Language";
import { Piece, Record } from "@/app/models/Record";
import { useCallback } from "react";
import { useConfirmLang } from "./useConfirmLanguage";

// Determine which API to use
const useFakeApi = process.env.EXPO_PUBLIC_USE_FAKE_API === "true";

const { fetchAudioBase64, fetchTranslation } = useFakeApi
  ? require("@/app/services/fakeApi")
  : require("@/app/services/api/openai");

export const useTranslator = (toLanguages: Language[]) => {
  const { systemLangs } = useLanguages();
  const { confirmLang } = useConfirmLang(); // the last used confirm language.
  const { addRecord, updateRecord } = useRecordHistory();

  const handleTranslateRequest = useCallback(
    async (input: string) => {
      const translation = new Record(new Piece(input, "", new Map()));
      addRecord(translation);

      // Input TTS
      fetchAudioBase64(input).then((audio: string) => {
        translation.input.TTS = audio;
        updateRecord(translation);
      });

      // Translations
      toLanguages.forEach(async (toLang) => {
        // Add a empty Piece for the toLang.
        const piece = new Piece("", "", new Map());
        translation.translations.set(toLang, piece);
        updateRecord(translation);

        // Get translation.
        const translatedText = await fetchTranslation(input, toLang);
        piece.text = translatedText;
        updateRecord(translation);

        // Get TTS for the translation.
        const audio = await fetchAudioBase64(translatedText);
        piece.TTS = audio;
        updateRecord(translation);

        // Confirmations.
        const confirmLangs: Language[] = Array.from(
          new Set(
            [...systemLangs, confirmLang].filter(
              (lang): lang is Language =>
                lang !== undefined && lang.id !== toLang.id
            )
          )
        );

        for (const confirmLang of confirmLangs) {
          const confirmation = await fetchTranslation(
            translatedText,
            confirmLang
          );

          piece.confirmations.set(confirmLang, confirmation);
          updateRecord(translation);
        }
      });
    },
    [toLanguages, confirmLang, systemLangs, addRecord, updateRecord]
  );

  return { handleTranslateRequest };
};
