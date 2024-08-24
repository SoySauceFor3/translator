import { Record } from "@/app/models/Record";
import React, { createContext, useCallback, useContext, useState } from "react";
import { Language } from "../models/Language";

interface RecordHistoryContextType {
  history: Record[];
  addRecord: (record: Record) => void;
  updateRecord: (record: Record) => void;
  updatePieceConfirmations: (
    recordId: string,
    toLang: Language,
    confirmLang: Language,
    translation: string
  ) => void;
  clearHistory: () => void;
}

const RecordHistoryContext = createContext<
  RecordHistoryContextType | undefined
>(undefined);

export const useRecordHistory = () => {
  const context = useContext(RecordHistoryContext);
  if (!context) {
    throw new Error(
      "useRecordHistory must be used within a RecordHistoryProvider"
    );
  }
  return context;
};

export const RecordHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<Record[]>([]);

  const addRecord = useCallback((record: Record) => {
    setHistory((prevHistory) => [...prevHistory, record]);
  }, []);

  const updateRecord = useCallback((record: Record) => {
    setHistory((prevHistory) => {
      // find the record with the same id and update it
      const updatedHistory = prevHistory.map((h) =>
        h.id === record.id ? record : h
      );
      return updatedHistory;
    });
  }, []);

  const updatePieceConfirmations = useCallback(
    (
      recordId: string,
      toLang: Language,
      confirmLang: Language,
      translation: string
    ) => {
      setHistory((prevHistory) => {
        const updatedHistory = prevHistory.map((r) => {
          if (r.id !== recordId) return r;

          const currentTranslation = r.translations.get(toLang);
          if (!currentTranslation) {
            console.warn(
              `Translation not found for language ${toLang.acronym} in record ${recordId}`
            );
            return r;
          }

          return {
            ...r,
            translations: r.translations.set(toLang, {
              ...currentTranslation,
              confirmations: currentTranslation.confirmations.set(
                confirmLang,
                translation
              ),
            }),
          };
        });
        return updatedHistory;
      });
      console.log("Confirmations updated");
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <RecordHistoryContext.Provider
      value={{
        history,
        addRecord,
        updateRecord,
        updatePieceConfirmations,
        clearHistory,
      }}
    >
      {children}
    </RecordHistoryContext.Provider>
  );
};
