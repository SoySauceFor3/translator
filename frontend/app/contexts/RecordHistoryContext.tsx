import { Record } from "@/app/models/Record";
import React, { createContext, useCallback, useContext, useState } from "react";

interface RecordHistoryContextType {
  history: Record[];
  addRecord: (record: Record) => void;
  updateRecord: (record: Record) => void;
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

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <RecordHistoryContext.Provider
      value={{ history, addRecord, updateRecord, clearHistory }}
    >
      {children}
    </RecordHistoryContext.Provider>
  );
};
