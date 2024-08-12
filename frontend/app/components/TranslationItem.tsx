import { useAudio } from "@/app/hooks/useAudio";
import { Translation } from "@/app/models/Translation";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1 mr-2">
                <Text className="text-sm font-semibold text-secondary-dark mr-2">
                  {toLang.acronym}
                </Text>
                <Text
                  className={`${isFocused ? "text-xl" : "text-base"} text-text-secondary flex-1`}
                >
                  {translation.text}
                </Text>
              </View>
              {isFocused && (
                <TouchableOpacity
                  onPress={() => playAudio(translation.TTS)}
                  className="p-2 bg-secondary-light rounded-full"
                >
                  <Icon name="volume-up" size={16} color="#3E2723" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
}
