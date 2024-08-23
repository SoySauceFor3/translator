import { getLanguage, Language } from "@/app/models/Language";
import availableLanguages from "@/assets/languages.json";
import * as Localization from "expo-localization";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";
import Icon from "react-native-vector-icons/FontAwesome";

interface ConfirmLangSelectorProps {
  toLang: Language;
  onLangChange: (lang: Language) => void;
}

export default function ConfirmLangSelector({
  toLang,
  onLangChange,
}: ConfirmLangSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLang, setConfirmLang] = useState<Language | null>(null);

  const langs: Language[] = Object.values(availableLanguages).filter(
    (lang) => lang.id !== toLang.id
  );

  const systemLangs = Localization.getLocales()
    .map((locale) => getLanguage(locale))
    .filter((lang) => lang !== undefined);

  // reorder langs to put systemLangs first, but keep the order of the other langs
  const reorderedLangs = [
    ...systemLangs,
    ...langs.filter((lang) => !systemLangs.includes(lang)),
  ];

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
            <Text>{confirmLang?.acronym || "Select Language"}</Text>
            <Icon name="chevron-down" size={12} color="#3E2723" />
          </TouchableOpacity>
        }
      >
        <View className="w-48 bg-white rounded-lg shadow-lg">
          <Text className="text-lg font-bold p-2 border-b border-gray-200">
            {"Select Language"}
          </Text>
          <ScrollView className="max-h-60">
            {reorderedLangs.map((lang: Language) => (
              <TouchableOpacity
                key={lang.acronym}
                onPress={() => {
                  onLangChange(lang);
                  setConfirmLang(lang);
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
