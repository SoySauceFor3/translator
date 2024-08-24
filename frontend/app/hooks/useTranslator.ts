import { useRecordHistory } from "@/app/contexts/RecordHistoryContext";
import { useLanguages } from "@/app/hooks/useLanguages";
import { Language } from "@/app/models/Language";
import { Piece, Record } from "@/app/models/Record";
import { fetchAudioBase64, fetchTranslation } from "@/app/services/apiSelector";
import { useCallback } from "react";
import { useConfirmLang } from "./useConfirmLanguage";

export const useTranslator = (toLanguages: Language[]) => {
  const { systemLangs } = useLanguages();
  const { confirmLang } = useConfirmLang(); // the last used confirm language.
  const { addRecord, updateRecord } = useRecordHistory();

  const handleTranslateRequest = useCallback(
    async (input: string) => {
      const record = new Record(new Piece(input, "", new Map()));
      addRecord(record);

      // Input TTS
      fetchAudioBase64(input).then((audio: string) => {
        record.input.TTS = audio;
        updateRecord(record);
      });

      // Translations
      toLanguages.forEach(async (toLang) => {
        // Add a empty Piece for the toLang.
        const piece = new Piece("", "", new Map());
        record.translations.set(toLang, piece);
        updateRecord(record);

        // Get translation.
        const translatedText = await fetchTranslation(input, toLang);
        piece.text = translatedText;
        updateRecord(record);

        // Get TTS for the translation.
        const audio = await fetchAudioBase64(translatedText);
        piece.TTS = audio;
        updateRecord(record);

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
          updateRecord(record);
        }
      });
    },
    [toLanguages, confirmLang, systemLangs, addRecord, updateRecord]
  );

  return { handleTranslateRequest };
};
