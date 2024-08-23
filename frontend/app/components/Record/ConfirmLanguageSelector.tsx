import { Language } from "@/app/models/Language";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface ConfirmLangSelector {
  confirmations: Map<Language, string> | undefined;
  selectedLang: Language | null;
  onLangChange: (lang: Language) => void;
}

export default function ConfirmLangSelector({
  confirmations,
  selectedLang,
  onLangChange,
}: ConfirmLangSelector) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={toggleDropdown}
        className="flex-row items-center justify-between p-2 bg-secondary-light rounded-md"
      >
        <Text>{selectedLang ? selectedLang.acronym : "Select Language"}</Text>
        <Icon
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={12}
          color="#3E2723"
        />
      </TouchableOpacity>
      {isOpen && (
        <View className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md">
          {Array.from(confirmations || []).map(
            ([lang, _]: [Language, string]) => (
              <TouchableOpacity
                key={lang.acronym}
                onPress={() => {
                  onLangChange(lang);
                  setIsOpen(false);
                }}
                className={`p-2 ${
                  selectedLang === lang ? "bg-primary-light" : "bg-white"
                }`}
              >
                <Text>{lang.acronym}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}
    </View>
  );
}
