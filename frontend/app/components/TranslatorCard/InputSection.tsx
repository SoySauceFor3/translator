import React from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  const handleTranslate = () => {
    // if (inputText.trim()) {
    Keyboard.dismiss();
    handleTranslateRequest(inputText);
    // }
  };

  const isInputEmpty = !inputText.trim();

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
          className={`px-8 py-4 rounded-full shadow-md ${
            isInputEmpty ? "bg-gray-400" : "bg-primary"
          }`}
          onPress={handleTranslate}
          disabled={isInputEmpty}
        >
          <Text
            className={`font-bold text-lg ${
              isInputEmpty ? "text-gray-600" : "text-white"
            }`}
          >
            Translate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputSection;
