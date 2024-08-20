import AudioRecorder from "@/app/components/TranslatorCard/AudioRecorder";
import LanguageSelector from "@/app/components/TranslatorCard/LanguageSelector";
import { useLanguageSelector } from "@/app/hooks/useLanguageSelector";
import { useLanguageStorage } from "@/app/hooks/useLanguageStorage";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Translation } from "@/app/models/Translation";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface TranslatorCardProps {
  addToHistory: (translation: Translation) => void;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({ addToHistory }) => {
  const [inputText, setInputText] = useState("");

  // NOTE: the conversation mode will be considered in the future, and by then there will be a fromLanguages --- which will actually be "left / right languages".
  const {
    languages: toLanguages,
    handleLanguageToggle: handleToLanguageToggle,
  } = useLanguageStorage("toLanguages");
  const {
    languages: confirmLanguages,
    handleLanguageToggle: handleConfirmLanguageToggle,
  } = useLanguageSelector();

  const { handleTranslateRequest } = useTranslation(
    Array.from(toLanguages)
      .filter(([_, isSelected]) => isSelected)
      .map(([lang]) => lang),
    Array.from(confirmLanguages).map(([lang]) => lang),
    addToHistory
  );

  const handleTranscription = (transcription: string) => {
    setInputText(transcription);
  };

  return (
    <View className="h-3/7 bg-background p-6 rounded-2xl shadow-lg">
      <LanguageSelector
        availableLanguages={toLanguages}
        onLanguageToggle={handleToLanguageToggle}
        type="to"
      />
      <View className="mt-6">
        <TextInput
          className="w-full h-32 text-lg text-text-primary bg-surface p-4 rounded-xl"
          value={inputText}
          onChangeText={(text: string) => setInputText(text)}
          onSubmitEditing={() => handleTranslateRequest(inputText)}
          returnKeyType="go"
          placeholder="Enter text to translate"
          placeholderTextColor="#999"
          multiline
        />
        <View className="mt-6 flex-row justify-between items-center">
          <AudioRecorder onTranscription={handleTranscription} />
          <TouchableOpacity
            className="bg-primary px-8 py-4 rounded-full shadow-md"
            onPress={() => handleTranslateRequest(inputText)}
          >
            <Text className="text-white font-bold text-lg">Translate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TranslatorCard;
