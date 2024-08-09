import { Language } from "@/app/models/Language";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {selectedLanguages.map(([lang, _], index) => (
          <TouchableOpacity
            key={index}
            className="px-4 py-2 mr-2 bg-primary-light rounded-full"
            onPress={() => onLanguageToggle(lang)}
          >
            <Text className="text-sm font-semibold text-text-primary">
              {lang.acronym}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          className="px-4 py-2 bg-secondary-light rounded-full"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-sm font-semibold text-text-secondary">Add</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-surface p-4 rounded-lg w-3/4">
            <Text className="text-lg font-bold mb-2 text-text-primary">
              Select Languages
            </Text>
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
                  <Text className="text-text-secondary">
                    {lang.name} ({lang.acronym})
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item[0].acronym}
            />
            <TouchableOpacity
              className="mt-4 bg-primary p-2 rounded"
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
