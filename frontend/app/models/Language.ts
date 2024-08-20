export type Language = {
  name: string;
  acronym: string;
  icon: string;
};

const languageMap: { [key: string]: Language } = {
  en: { name: "English", acronym: "EN", icon: "" },
  zh: { name: "Mandarin Chinese", acronym: "中文", icon: "" },
  // Add more languages later
};

export function getLanguageFromCode(
  languageCode: string
): Language | undefined {
  return languageMap[languageCode];
}
