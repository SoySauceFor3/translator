import { Record } from "@/app/models/Record";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface InputSectionProps {
  item: Record;
  isFocused: boolean;
  playAudio: (audio: string) => void;
}

export default function InputSection({
  item,
  isFocused,
  playAudio,
}: InputSectionProps) {
  const isTTSAvailable = item.input.TTS.trim() !== "";

  return (
    <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-200">
      <Text
        className={`${isFocused ? "text-2xl" : "text-xl"} font-bold text-text-primary flex-1 mr-2`}
      >
        {item.input.text}
      </Text>
      {isFocused && (
        <TouchableOpacity
          onPress={() => isTTSAvailable && playAudio(item.input.TTS)}
          className={`p-3 rounded-full shadow-sm ${isTTSAvailable ? "bg-primary-light" : "bg-gray-300"}`}
          disabled={!isTTSAvailable}
        >
          <Icon
            name="volume-up"
            size={24}
            color={isTTSAvailable ? "#3E2723" : "#999999"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
