import { useAudio } from "@/app/hooks/useAudio";
import { Language } from "@/app/models/Language";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ConfirmLangSelector from "./ConfirmLanguageSelector";

interface ButtonsProps {
  confirmationMode: boolean;
  turnOnConfirmationMode: () => void;
  TTS: string;
  toLang: Language;
  confirmLang: Language | undefined;
  onConfirmLangChange: (lang: Language | undefined) => void;
}

export default function Buttons({
  confirmationMode: isConfirmationMode,
  turnOnConfirmationMode,
  TTS,
  toLang,
  confirmLang,
  onConfirmLangChange,
}: ButtonsProps) {
  const isTTSAvailable = TTS.trim() !== "";
  const { playAudio } = useAudio();

  return (
    <View className="w-full ">
      {isConfirmationMode ? (
        <ConfirmLangSelector
          toLang={toLang}
          confirmLang={confirmLang}
          onConfirmLangChange={onConfirmLangChange}
        />
      ) : (
        <View className="flex-row justify-between ">
          <TouchableOpacity
            onPress={turnOnConfirmationMode}
            className="p-2 rounded-full bg-secondary-light"
          >
            <Icon name="check" size={16} color="#3E2723" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => playAudio(TTS)}
            disabled={!isTTSAvailable}
            className={`p-2 rounded-full ${
              isTTSAvailable ? "bg-secondary-light" : "bg-gray-300"
            }`}
          >
            <Icon
              name="volume-up"
              size={16}
              color={isTTSAvailable ? "#3E2723" : "#999999"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
