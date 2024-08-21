import { useAudio } from "@/app/hooks/useAudio";
import { Piece, Translation } from "@/app/models/Translation";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Language } from "../../models/Language";

interface TranslationItemProps {
  item: Translation;
  isFocused: boolean;
}

const TranslationItem: React.FC<TranslationItemProps> = ({
  item,
  isFocused,
}) => {
  const { playAudio } = useAudio();

  const renderInputSection = useCallback(
    () => (
      <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <Text
          className={`${isFocused ? "text-2xl" : "text-xl"} font-bold text-text-primary flex-1 mr-2`}
        >
          {item.input.text}
        </Text>
        {isFocused && (
          <TouchableOpacity
            onPress={() => playAudio(item.input.TTS)}
            className="p-3 bg-primary-light rounded-full shadow-sm"
          >
            <Icon name="volume-up" size={24} color="#3E2723" />
          </TouchableOpacity>
        )}
      </View>
    ),
    [isFocused, item.input, playAudio]
  );

  const renderTranslationEntry = useCallback(
    ([toLang, translation]: [Language, Piece], entryIdx: number) => {
      const [selectedConfirmationLang, setSelectedConfirmationLang] =
        useState<Language | null>(null);
      const [isConfirmPressed, setIsConfirmPressed] = useState(false);
      const [scrollPosition, setScrollPosition] = useState(0);

      const itemWidth = 60;
      const updateSelectedLanguage = (newPosition: number) => {
        const languages = Array.from(translation.confirmations || []);
        const selectedIndex = Math.floor(newPosition / itemWidth);
        if (selectedIndex >= 0 && selectedIndex < languages.length) {
          setSelectedConfirmationLang(languages[selectedIndex][0]);
        }
      };

      return (
        <View key={`${toLang.name}-${entryIdx}`} className="mt-4">
          <View
            className={`flex-row items-start justify-between p-3 rounded-lg ${
              isConfirmPressed ? "bg-text-primary" : "bg-gray-50"
            }`}
          >
            <View className="flex-row items-start flex-1 mr-2">
              <View className="flex-col items-start mr-3">
                <Text
                  className={`text-lg font-semibold mb-2 ${
                    isConfirmPressed ? "text-background" : "text-secondary-dark"
                  }`}
                >
                  {toLang.acronym}
                </Text>
                {isFocused && (
                  <View
                    onStartShouldSetResponder={() => true}
                    onResponderGrant={() => {
                      console.log("onResponderGrant");
                      setIsConfirmPressed(true);
                      updateSelectedLanguage(0); // Select first language by default
                    }}
                    onResponderRelease={() => {
                      console.log("onResponderRelease");
                      setIsConfirmPressed(false);
                    }}
                    onResponderMove={(e) => {
                      console.log("onResponderMove", e.nativeEvent.locationX);
                      if (isConfirmPressed) {
                        const newPosition = e.nativeEvent.locationX;
                        setScrollPosition(newPosition);
                        updateSelectedLanguage(newPosition);
                      }
                    }}
                  >
                    {isConfirmPressed ? (
                      <View className="flex-row overflow-hidden w-[100px]">
                        {Array.from(translation.confirmations || []).map(
                          ([lang, _]: [Language, string], index: number) => {
                            const isHighlighted =
                              selectedConfirmationLang === lang;
                            return (
                              <View
                                key={lang.acronym}
                                className={`p-2 w-[${itemWidth}px] ${
                                  isHighlighted
                                    ? "bg-primary-light"
                                    : "bg-secondary-light"
                                }`}
                              >
                                <Text>{lang.acronym}</Text>
                              </View>
                            );
                          }
                        )}
                      </View>
                    ) : (
                      <View className="flex-row space-x-2">
                        <View className="p-2 rounded-full bg-secondary-light">
                          <Icon name="check" size={18} color="#3E2723" />
                        </View>
                        <TouchableOpacity
                          onPress={() => playAudio(translation.TTS)}
                          className="p-2 bg-secondary-light rounded-full"
                        >
                          <Icon name="volume-up" size={18} color="#3E2723" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </View>
              <Text
                className={`${isFocused ? "text-lg" : "text-base"} ${
                  isConfirmPressed ? "text-background" : "text-text-secondary"
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
      {renderInputSection()}
      {Array.from(item.translations.entries()).map(renderTranslationEntry)}
    </View>
  );
};

export default TranslationItem;
