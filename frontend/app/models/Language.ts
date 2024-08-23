export type Language = {
  id: string;
  name: string;
  acronym: string;
};

const languageMap: { [key: string]: Language } = {
  en: { id: "en", name: "English", acronym: "EN" },
  zh: { id: "zh", name: "Mandarin Chinese", acronym: "中文" },
  // Add more languages later
};

export function getLanguageFromCode(
  languageCode: string
): Language | undefined {
  return languageMap[languageCode];
}
