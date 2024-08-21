import useConfirmationState from "@/app/hooks/useConfirmationState";
import { Language } from "@/app/models/Language";
import { Piece } from "@/app/models/record";
import React from "react";
import { Text, View } from "react-native";
import ConfirmationButton from "./ConfirmationButton";
import LanguageScroller from "./LanguageScroller";

interface TranslationEntryProps {
  toLang: Language;
  translation: Piece;
  entryIdx: number;
  isFocused: boolean;
  playAudio: (audio: string) => void;
}

enum Colors {
  BACKGROUND = "bg-gray-50",
  PRESSED = "bg-text-primary",
  TEXT = "text-text-secondary",
  TEXT_PRESSED = "text-background",
}

const Entry: React.FC<TranslationEntryProps> = ({
  toLang,
  translation,
  entryIdx,
  isFocused,
  playAudio,
}) => {
  const {
    selectedConfirmationLang,
    isConfirmPressed,
    handleConfirmPress,
    handleConfirmRelease,
    handleScroll,
  } = useConfirmationState(translation.confirmations);

  return (
    <View key={`${toLang.name}-${entryIdx}`} className="mt-4">
      <View
        className={`flex-row items-start justify-between p-3 rounded-lg ${
          isConfirmPressed ? Colors.PRESSED : Colors.BACKGROUND
        }`}
      >
        <View className="flex-row items-start flex-1 mr-2">
          <View className="flex-col items-start mr-3">
            <Text
              className={`text-lg font-semibold mb-2 ${
                isConfirmPressed ? Colors.TEXT_PRESSED : "text-secondary-dark"
              }`}
            >
              {toLang.acronym}
            </Text>
            {isFocused && (
              <ConfirmationButton
                isConfirmPressed={isConfirmPressed}
                onPress={handleConfirmPress}
                onRelease={handleConfirmRelease}
                onMove={handleScroll}
                playAudio={() => playAudio(translation.TTS)}
              >
                {isConfirmPressed && (
                  <LanguageScroller
                    confirmations={translation.confirmations}
                    selectedLang={selectedConfirmationLang}
                  />
                )}
              </ConfirmationButton>
            )}
          </View>
          <Text
            className={`${isFocused ? "text-lg" : "text-base"} ${
              isConfirmPressed ? Colors.TEXT_PRESSED : Colors.TEXT
            } flex-1`}
          >
            {isConfirmPressed &&
            selectedConfirmationLang &&
            translation.confirmations
              ? translation.confirmations.get(selectedConfirmationLang)
              : translation.text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Entry;
