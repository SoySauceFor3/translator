import { useInputText } from "@/app/contexts/InputTextContext";
import { useTranslator } from "@/app/hooks/useTranslator";
import { Language } from "@/app/models/Language";
import React from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Make sure you have this package installed
import AudioRecorder from "./AudioRecorder";

interface InputSectionProps {
  toLangs: Language[];
}

const InputSection: React.FC<InputSectionProps> = ({ toLangs }) => {
  const { inputText, setInputText, inputRef } = useInputText();
  const { handleTranslateRequest } = useTranslator(toLangs);

  const handleTranslate = () => {
    Keyboard.dismiss();
    handleTranslateRequest(inputText);
  };

  const clearInput = () => {
    setInputText("");
    inputRef.current?.focus();
  };

  const isInputEmpty = !inputText.trim();

  return (
    <View className="mt-6">
      <View className="relative">
        <TextInput
          ref={inputRef}
          className="w-full h-32 text-lg text-text-primary bg-surface p-4 rounded-xl pr-10"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => handleTranslateRequest(inputText)}
          returnKeyType="default"
          placeholder="Enter text to translate"
          placeholderTextColor="#999"
          multiline
        />
        {!isInputEmpty && (
          <TouchableOpacity
            onPress={clearInput}
            className="absolute right-2 top-2 p-2"
          >
            <Icon name="close-circle" size={24} color="#999" />
          </TouchableOpacity>
        )}
      </View>
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
