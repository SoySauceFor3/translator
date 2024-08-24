import { Language } from "@/app/models/Language";

const useFakeApi = process.env.EXPO_PUBLIC_USE_FAKE_API === "true";

const realOpenAiApi = require("@/app/services/api/openai");
const realMyOwnBackendApi = require("@/app/services/api/myOwnBackend");
const fakeApi = require("@/app/services/fakeApi");

const selectedApi = useFakeApi
  ? fakeApi
  : {
      ...realOpenAiApi,
      ...realMyOwnBackendApi,
    };

export const fetchTranslation = (
  sentence: string,
  outputLanguage: Language
): Promise<string> => selectedApi.fetchTranslation(sentence, outputLanguage);

export const fetchAudioBase64 = (text: string): Promise<string> =>
  selectedApi.fetchAudioBase64(text);

export const fetchSpeechToText = (recordingUri: string): Promise<string> =>
  selectedApi.fetchSpeechToText(recordingUri);
