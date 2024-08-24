import { useLanguages } from "@/app/hooks/useLanguages";
import { Language } from "@/app/models/Language";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";
import Icon from "react-native-vector-icons/FontAwesome";

interface ConfirmLangSelectorProps {
  toLang: Language;
  confirmLang: Language | undefined;
  onConfirmLangChange: (lang: Language | undefined) => void;
}

const getFontSizeClass = (text: string) => {
  if (text.length <= 4) return "text-base";
  if (text.length <= 6) return "text-sm";
  return "text-xs";
};

export default function ConfirmLangSelector({
  toLang,
  confirmLang,
  onConfirmLangChange,
}: ConfirmLangSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { reorderedLangs } = useLanguages();
  const confirmLangs = reorderedLangs.filter((lang) => lang.id !== toLang.id);

  const displayText = confirmLang?.acronym || "Select Language";
  const fontSizeClass = getFontSizeClass(displayText);

  return (
    <View>
      <Popover
        isVisible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        from={
          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            className="flex-row items-center justify-between p-2 bg-secondary-light rounded-md"
          >
            <Text className={`${fontSizeClass} font-semibold`}>
              {displayText}
            </Text>
            <Icon name="chevron-down" size={12} color="#3E2723" />
          </TouchableOpacity>
        }
      >
        <View className="w-48 bg-white rounded-lg shadow-lg">
          <Text className="text-lg font-bold p-2 border-b border-gray-200">
            {"Select Language"}
          </Text>
          <ScrollView className="max-h-60">
            {confirmLangs.map((lang: Language) => (
              <TouchableOpacity
                key={lang.acronym}
                onPress={() => {
                  onConfirmLangChange(lang);
                  setIsOpen(false);
                }}
                className={`p-2 ${
                  confirmLang?.name === lang?.name
                    ? "bg-primary-light"
                    : "bg-white"
                }`}
              >
                <Text>{`${lang.acronym} - ${lang.name}`}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Popover>
    </View>
  );
}
