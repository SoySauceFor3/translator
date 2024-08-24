import { useConfirmation } from "@/app/hooks/useConfirmation";
import { Language } from "@/app/models/Language";
import { Piece } from "@/app/models/Record";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Buttons from "./Buttons";
import EntryText from "./EntryText";

interface TranslationEntryProps {
  recordId: string;
  toLang: Language;
  piece: Piece;
  isFocused: boolean;
  confirmLang: Language | undefined;
  setConfirmLang: (lang: Language | undefined) => void;
  parentStyle?: string; // This is needed because somehow space-y-4 is not working.
}

enum Colors {
  BACKGROUND = "bg-gray-50",
  PRESSED = "bg-text-primary",
  TEXT = "text-text-secondary",
  TEXT_PRESSED = "text-background",
}

const Entry: React.FC<TranslationEntryProps> = ({
  recordId,
  toLang,
  piece,
  isFocused,
  confirmLang,
  setConfirmLang,
  parentStyle = "",
}) => {
  // Confirmation mode
  const [confirmationMode, setConfirmationMode] = useState(false);
  useEffect(() => {
    if (!isFocused) {
      setConfirmationMode(false);
    }
  }, [isFocused]);

  // Hook to get extra confirmation if needed.
  useConfirmation(recordId, toLang, piece, confirmLang, confirmationMode);

  return (
    <View className={`${parentStyle}`}>
      <TouchableOpacity
        onPress={() => setConfirmationMode(false)}
        activeOpacity={confirmationMode ? 0.2 : 1}
        disabled={!confirmationMode}
        className={`flex-row items-start justify-between p-3 rounded-lg ${
          confirmationMode ? Colors.PRESSED : Colors.BACKGROUND
        }`}
      >
        <View className="flex-row items-start flex-1 ">
          <View
            className={`flex-col items-start ${
              isFocused ? "w-20" : "w-14"
            } mr-2 `}
          >
            <Text
              className={`text-lg font-semibold mb-2 ${
                confirmationMode ? Colors.TEXT_PRESSED : "text-secondary-dark"
              }`}
            >
              {toLang.acronym}
            </Text>
            {isFocused && (
              <Buttons
                confirmationMode={confirmationMode}
                turnOnConfirmationMode={() => setConfirmationMode(true)}
                TTS={piece.TTS}
                toLang={toLang}
                confirmLang={confirmLang}
                onConfirmLangChange={setConfirmLang}
              />
            )}
          </View>
          <View className="flex-1">
            <EntryText
              isFocused={isFocused}
              confirmationMode={confirmationMode}
              text={
                confirmationMode && confirmLang
                  ? piece.confirmations.get(confirmLang) ||
                    `...🖊️...confirming for ${piece.text} in ${confirmLang.name}`
                  : piece.text || "...🖊️..."
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Entry;
