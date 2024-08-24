import { useRecordHistory } from "@/app/contexts/RecordHistoryContext";
import { Language } from "@/app/models/Language";
import { Piece } from "@/app/models/Record";
import { fetchTranslation } from "@/app/services/api/openai";
import { useCallback, useEffect } from "react";

export const useConfirmation = (
  recordId: string,
  toLang: Language,
  piece: Piece,
  confirmLang: Language | undefined,
  confirmationMode: boolean
) => {
  const { updatePieceConfirmations } = useRecordHistory();

  const getOrFetchConfirmation = useCallback(async () => {
    if (confirmLang && !piece.confirmations.has(confirmLang)) {
      try {
        const translation = await fetchTranslation(piece.text, confirmLang);
        updatePieceConfirmations(recordId, toLang, confirmLang, translation);
      } catch (err) {
        console.error("Error fetching translation:", err);
        // TODO: Handle error (e.g., show an error message to the user)
      }
    }
  }, [confirmLang, piece, updatePieceConfirmations, recordId, toLang]);

  useEffect(() => {
    if (confirmationMode && confirmLang) {
      getOrFetchConfirmation();
    }
  }, [confirmationMode, confirmLang, getOrFetchConfirmation]);

  return {};
};
