import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AudioRecorder from "./AudioRecorder";

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleTranslateRequest: (text: string) => void;
  handleTranscription: (transcription: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  setInputText,
  handleTranslateRequest,
  handleTranscription,
}) => {
  return (
    <View className="mt-6">
      <TextInput
        className="w-full h-32 text-lg text-text-primary bg-surface p-4 rounded-xl"
        value={inputText}
        onChangeText={setInputText}
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
  );
};

export default InputSection;
