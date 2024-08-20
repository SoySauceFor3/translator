import { useAudio } from "@/app/hooks/useAudio";
import { Translation } from "@/app/models/Translation";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface TranslationItemProps {
  item: Translation;
  isFocused: boolean;
}

export default function TranslationItem({
  item,
  isFocused,
}: TranslationItemProps) {
  const { playAudio } = useAudio();
  const [indexToShowConfirmText, setIndexToShowConfirmText] = useState<
    number | null
  >(null);

  const renderInputSection = () => (
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
  );

  const renderTranslationEntry = (
    [toLang, translation]: [any, any],
    toIndex: number
  ) => (
    <View key={`${toLang.name}-${toIndex}`} className="mt-4">
      <View
        className={`flex-row items-start justify-between p-3 rounded-lg ${
          indexToShowConfirmText === toIndex ? "bg-text-primary" : "bg-gray-50"
        }`}
      >
        <View className="flex-row items-start flex-1 mr-2">
          <View className="flex-col items-start mr-3">
            <Text
              className={`text-lg font-semibold mb-2 ${
                indexToShowConfirmText === toIndex
                  ? "text-background"
                  : "text-secondary-dark"
              }`}
            >
              {toLang.acronym}
            </Text>
            {isFocused && (
              <View className="flex-row space-x-2">
                <Pressable
                  onPressIn={() => setIndexToShowConfirmText(toIndex)}
                  onPressOut={() => setIndexToShowConfirmText(null)}
                  className={`p-2 rounded-full ${
                    indexToShowConfirmText === toIndex
                      ? "bg-background"
                      : "bg-secondary-light"
                  }`}
                >
                  <Icon name="check" size={18} color="#3E2723" />
                </Pressable>
                <TouchableOpacity
                  onPress={() => playAudio(translation.TTS)}
                  className="p-2 bg-secondary-light rounded-full"
                >
                  <Icon name="volume-up" size={18} color="#3E2723" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text
            className={`${isFocused ? "text-lg" : "text-base"} ${
              indexToShowConfirmText === toIndex
                ? "text-background"
                : "text-text-secondary"
            } flex-1`}
          >
            {indexToShowConfirmText === toIndex && translation.confirmations
              ? Array.from(translation.confirmations.values())[0] //TODO: This is a hack to get the first confirmation, but it should be matched to a language.
              : translation.text}
          </Text>
        </View>
      </View>
    </View>
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
}
