import { Translation } from "@/app/models/Translation";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface InputSectionProps {
  item: Translation;
  isFocused: boolean;
  playAudio: (audio: string) => void;
}

export default function InputSection({
  item,
  isFocused,
  playAudio,
}: InputSectionProps) {
  return (
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
}
