import { useInputText } from "@/app/contexts/InputTextContext";
import { useAudio } from "@/app/hooks/useAudio";
import { Record } from "@/app/models/Record";
import React, { useState } from "react";
import {
  Animated,
  Clipboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface InputSectionProps {
  item: Record;
  isFocused: boolean;
}

export default function InputSection({ item, isFocused }: InputSectionProps) {
  const isTTSAvailable = item.input.TTS.trim() !== "";
  const { playAudio } = useAudio();

  const text = item.input.text;

  const { setInputText } = useInputText();
  const putTextToInputWindow = () => {
    setInputText(text);
  };

  const [fadeAnim] = useState(new Animated.Value(0));
  const copyText = () => {
    const textToCopy = text;

    Clipboard.setString(textToCopy);
    console.log("copied");

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(700),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-200">
      <TouchableOpacity
        activeOpacity={1}
        onPress={putTextToInputWindow}
        onLongPress={copyText}
        className="flex-1 mr-2"
      >
        <Text
          className={`${isFocused ? "text-2xl" : "text-xl"} font-bold text-text-primary`}
        >
          {item.input.text}
        </Text>
        <Animated.View
          style={{
            opacity: fadeAnim,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 8,
          }}
        >
          <Text className="text-white font-bold">Text copied to clipboard</Text>
        </Animated.View>
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
