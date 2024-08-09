import { Language } from "@/app/models/Language";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text as RNText,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
} from "react-native";

const View = styled(RNView);
const Text = styled(RNText);
const TouchableOpacity = styled(RNTouchableOpacity);

interface LanguageSelectorProps {
  availableLanguages: Map<Language, boolean>;
  onLanguageToggle: (language: Language) => void;
  type: "to" | "from";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  availableLanguages,
  onLanguageToggle,
  type,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLanguages = Array.from(availableLanguages).filter(
    ([_, isSelected]) => isSelected
  );
  const unselectedLanguages = Array.from(availableLanguages).filter(
    ([_, isSelected]) => !isSelected
  );

  return (
    <View className="flex-row items-center bg-white rounded-full px-2 py-1 space-x-2">
      <TouchableOpacity
        className="w-6 h-6 rounded-full bg-green-500 items-center justify-center"
        onPress={() => {}}
      >
        <Ionicons name="checkmark" size={16} color="white" />
      </TouchableOpacity>

      {selectedLanguages.map(([lang, _], index) => (
        <TouchableOpacity
          key={index}
          className="w-6 h-6 rounded-full bg-gray-300 items-center justify-center"
          onPress={() => onLanguageToggle(lang)}
        >
          <Text className="text-xs font-bold text-gray-600">
            {lang.acronym}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className="w-6 h-6 rounded-full bg-gray-200 items-center justify-center"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={16} color="gray" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded-lg w-3/4">
            <Text className="text-lg font-bold mb-2">Select Languages</Text>
            <FlatList
              data={unselectedLanguages}
              renderItem={({ item: [lang, _] }) => (
                <TouchableOpacity
                  className="py-2"
                  onPress={() => {
                    onLanguageToggle(lang);
                    setModalVisible(false);
                  }}
                >
                  <Text>
                    {lang.name} ({lang.acronym})
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item[0].acronym}
            />
            <TouchableOpacity
              className="mt-4 bg-blue-500 p-2 rounded"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LanguageSelector;
