import { useAudio } from "@/app/hooks/useAudio";
import { Language } from "@/app/models/Language";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LanguageScroller from "./LanguageScroller";

interface ButtonsProps {
  isConfirmPressed: boolean;
  onPress: () => void;
  onRelease: () => void;
  onMove: (position: number) => void;

  TTS: string;

  selectedConfirmationLang: Language | null;
  confirmations: Map<Language, string>;
}

export default function Buttons({
  isConfirmPressed,
  onPress,
  onRelease,
  onMove,

  TTS,

  selectedConfirmationLang,
  confirmations,
}: ButtonsProps) {
  const isTTSAvailable = TTS.trim() !== "";
  const { playAudio } = useAudio();

  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderGrant={onPress}
      onResponderRelease={onRelease}
      onResponderMove={(e) => onMove(e.nativeEvent.locationX)}
    >
      {isConfirmPressed ? (
        <LanguageScroller
          confirmations={confirmations}
          selectedLang={selectedConfirmationLang}
        />
      ) : (
        <View className="flex-row space-x-2">
          <View className="p-2 rounded-full bg-secondary-light">
            <Icon name="check" size={18} color="#3E2723" />
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("hello");
              playAudio(TTS);
            }}
            disabled={!isTTSAvailable}
            className={`p-2 rounded-full ${
              isTTSAvailable ? "bg-secondary-light" : "bg-gray-300"
            }`}
          >
            <Icon
              name="volume-up"
              size={18}
              color={isTTSAvailable ? "#3E2723" : "#999999"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
