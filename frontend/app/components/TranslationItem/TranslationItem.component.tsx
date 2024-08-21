import { useAudio } from "@/app/hooks/useAudio";
import useConfirmationState from "@/app/hooks/useConfirmationState";
import { Language } from "@/app/models/Language";
import { Piece, Translation } from "@/app/models/Translation";
import React, { useCallback } from "react";
import { Text, View } from "react-native";
import ConfirmationButton from "./ConfirmationButton";
import InputSection from "./InputSection";
import LanguageScroller from "./LanguageScroller";

interface TranslationItemProps {
  item: Translation;
  isFocused: boolean;
}

enum Colors {
  BACKGROUND = "bg-gray-50",
  PRESSED = "bg-text-primary",
  TEXT = "text-text-secondary",
  TEXT_PRESSED = "text-background",
}

const TranslationItem: React.FC<TranslationItemProps> = ({
  item,
  isFocused,
}) => {
  const { playAudio } = useAudio();

  const renderTranslationEntry = useCallback(
    ([toLang, translation]: [Language, Piece], entryIdx: number) => {
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
                    isConfirmPressed
                      ? Colors.TEXT_PRESSED
                      : "text-secondary-dark"
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
    },
    [isFocused, playAudio]
  );

  return (
    <View
      className={`mb-6 p-5 rounded-xl ${
        isFocused
          ? "bg-surface shadow-lg"
          : "bg-background border-2 border-primary-light"
      }`}
    >
      <InputSection item={item} isFocused={isFocused} playAudio={playAudio} />
      {Array.from(item.translations.entries()).map(renderTranslationEntry)}
    </View>
  );
};

export default TranslationItem;
