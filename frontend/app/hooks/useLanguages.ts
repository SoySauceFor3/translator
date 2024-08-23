import { getLanguage, Language } from "@/app/models/Language";
import availableLanguages from "@/assets/languages.json";
import * as Localization from "expo-localization";
import { useMemo } from "react";

export function useLanguages() {
  const systemLangs = useMemo(
    () =>
      Localization.getLocales()
        .map((locale) => getLanguage(locale))
        .filter((lang): lang is Language => lang !== undefined),
    []
  );

  const reorderedLangs = useMemo(
    () => [
      ...systemLangs,
      ...Object.values(availableLanguages).filter(
        (lang) => !systemLangs.includes(lang)
      ),
    ],
    [systemLangs, availableLanguages]
  );

  return {
    systemLangs,
    reorderedLangs,
  };
}
