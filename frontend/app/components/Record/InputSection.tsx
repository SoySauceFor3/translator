import { useInputText } from "@/app/contexts/InputTextContext";
import { useAudio } from "@/app/hooks/useAudio";
import { Record } from "@/app/models/Record";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface InputSectionProps {
  item: Record;
  isFocused: boolean;
}

export default function InputSection({ item, isFocused }: InputSectionProps) {
  const isTTSAvailable = item.input.TTS.trim() !== "";
  const { playAudio } = useAudio();
  const { setInputText } = useInputText();

  const handleLongPress = () => {
    const text = item.input.text;
    setInputText(text);
  };

  return (
    <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-200">
      <TouchableOpacity onLongPress={handleLongPress} className="flex-1 mr-2">
        <Text
          className={`${isFocused ? "text-2xl" : "text-xl"} font-bold text-text-primary`}
        >
          {item.input.text}
        </Text>
      </TouchableOpacity>
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
