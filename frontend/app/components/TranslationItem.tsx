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

  return (
    <View
      className={`mb-4 p-4 rounded-lg ${
        isFocused
          ? "bg-surface shadow-md"
          : "bg-background border border-primary-light"
      }`}
    >
      <View className="flex-row items-center justify-between mb-1">
        <Text
          className={`${isFocused ? "text-xl" : "text-base"} font-bold text-text-primary flex-1 mr-2`}
        >
          {item.input.text}
        </Text>
        {isFocused && (
          <TouchableOpacity
            onPress={() => playAudio(item.input.TTS)}
            className="p-2 bg-primary-light rounded-full"
          >
            <Icon name="volume-up" size={20} color="#3E2723" />
          </TouchableOpacity>
        )}
      </View>
      {Array.from(item.translations.entries()).map(
        ([toLang, translation], toIndex) => (
          <View key={`${toLang.name}-${toIndex}`} className="mt-3">
            <View
              className={`flex-row items-center justify-between ${indexToShowConfirmText === toIndex ? "bg-text-primary rounded-lg" : ""}`}
            >
              <View className="flex-row items-center flex-1 mr-2 p-2">
                <View className="flex-col items-start">
                  <Text
                    className={`text-sm font-semibold mr-2 ${indexToShowConfirmText === toIndex ? "text-background" : "text-secondary-dark"}`}
                  >
                    {toLang.acronym}
                  </Text>
                  <View className="flex-row mt-2">
                    {isFocused ? (
                      <Pressable
                        onPressIn={() => setIndexToShowConfirmText(toIndex)}
                        onPressOut={() => setIndexToShowConfirmText(null)}
                        className={`p-2 rounded-full ${indexToShowConfirmText === toIndex ? "bg-background" : "bg-secondary-light"}`}
                      >
                        <Icon
                          name="check"
                          size={16}
                          color={
                            indexToShowConfirmText === toIndex
                              ? "#3E2723"
                              : "#3E2723"
                          }
                        />
                      </Pressable>
                    ) : (
                      <View className="w-8 " />
                    )}
                    {isFocused ? (
                      <TouchableOpacity
                        onPress={() => playAudio(translation.TTS)}
                        className={`p-2 rounded-full ${indexToShowConfirmText === toIndex ? "bg-background" : "bg-secondary-light"}`}
                      >
                        <Icon
                          name="volume-up"
                          size={16}
                          color={
                            indexToShowConfirmText === toIndex
                              ? "#3E2723"
                              : "#3E2723"
                          }
                        />
                      </TouchableOpacity>
                    ) : (
                      <View className="w-8" />
                    )}
                  </View>
                </View>
                <Text
                  className={`${isFocused ? "text-xl" : "text-base"} ${indexToShowConfirmText === toIndex ? "text-background" : "text-text-secondary"} flex-1`}
                >
                  {indexToShowConfirmText === toIndex &&
                  translation.confirmations
                    ? Array.from(translation.confirmations.values())[0]
                    : translation.text}
                </Text>
              </View>
            </View>
          </View>
        )
      )}
    </View>
  );
}
