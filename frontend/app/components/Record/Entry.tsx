import { useConfirmation } from "@/app/hooks/useConfirmation";
import { Language } from "@/app/models/Language";
import { Piece } from "@/app/models/Record";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Buttons from "./Buttons";

interface TranslationEntryProps {
  recordId: string;
  toLang: Language;
  piece: Piece;
  isFocused: boolean;
  confirmLang: Language | undefined;
  setConfirmLang: (lang: Language | undefined) => void;
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
}) => {
  const [confirmationMode, setConfirmationMode] = React.useState(false);
  useEffect(() => {
    if (!isFocused) {
      setConfirmationMode(false);
    }
  }, [isFocused]);
  useConfirmation(recordId, toLang, piece, confirmLang, confirmationMode);

  return (
    <View className="mt-4">
      <TouchableOpacity
        onPress={() => setConfirmationMode(false)}
        activeOpacity={confirmationMode ? 0.2 : 1}
        disabled={!confirmationMode}
        className={`flex-row items-start justify-between p-3 rounded-lg ${
          confirmationMode ? Colors.PRESSED : Colors.BACKGROUND
        }`}
      >
        <View className="flex-row items-start flex-1 mr-2">
          <View className="flex-col items-start mr-3">
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
          <Text
            className={`${isFocused ? "text-lg" : "text-base"} ${
              confirmationMode ? Colors.TEXT_PRESSED : Colors.TEXT
            } flex-1`}
          >
            {confirmationMode && confirmLang
              ? piece.confirmations.get(confirmLang) ||
                `...🖊️...confirming for ${piece.text} in ${confirmLang.name}`
              : piece.text || "...🖊️..."}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Entry;
