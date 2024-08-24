import { useInputText } from "@/app/contexts/InputTextContext";
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
  handleTranslateRequest: (text: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  handleTranslateRequest,
}) => {
  const { inputText, setInputText, inputRef } = useInputText();

  const handleTranslate = () => {
    Keyboard.dismiss();
    handleTranslateRequest(inputText);
  };

  const isInputEmpty = !inputText.trim();

  return (
    <View className="mt-6">
      <TextInput
        ref={inputRef}
        className="w-full h-32 text-lg text-text-primary bg-surface p-4 rounded-xl"
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={() => handleTranslateRequest(inputText)}
        returnKeyType="default"
        placeholder="Enter text to translate"
        placeholderTextColor="#999"
        multiline
      />
      <View className="mt-6 flex-row justify-between items-center">
        <AudioRecorder />
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
