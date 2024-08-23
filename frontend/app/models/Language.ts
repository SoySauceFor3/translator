import languages from "@/assets/languages.json";
import { Locale } from "expo-localization";

export type Language = {
  id: string; // IETF BCP 47.
  name: string;
  acronym: string;
};

export function getLanguage(locale: Locale): Language | undefined {
  console.log("get Language from Locale", locale.languageTag);
  const localeLangSegments = locale.languageTag.toLowerCase().split("-");

  let bestMatch: Language | undefined;
  let maxMatchedSegments = 0;

  for (const lang of languages) {
    const langSegments = lang.id.toLowerCase().split("-");
    let matchedSegments = 0;

    for (
      let i = 0;
      i < Math.min(localeLangSegments.length, langSegments.length);
      i++
    ) {
      if (localeLangSegments[i] === langSegments[i]) {
        matchedSegments++;
      } else {
        break;
      }
    }

    if (matchedSegments > 0 && matchedSegments > maxMatchedSegments) {
      maxMatchedSegments = matchedSegments;
      bestMatch = lang;
    }
  }
  console.log("Language not found for locale", locale.languageTag);
  return bestMatch;
}
