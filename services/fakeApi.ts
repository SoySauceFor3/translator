import birdSound from "@/assets/bird-sound.mp3";
import { Language } from "@/types";
import { Audio } from "expo-av";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export const fetchTranslation = async (
  sentence: string,
  outputLanguage: Language
): Promise<string> => {
  return "fake translation";
};

export async function fetchAudioBase64(base64Audio: string): Promise<string> {
  if (!base64Audio) return "";

  try {
    const ssss = await Audio.Sound.createAsync(birdSound);
    const status = await ssss.sound.getStatusAsync();
    if (!status.isLoaded) {
      throw new Error("Sound is not loaded");
    }
    const uri = status.uri as string;
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    const base64String = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return base64String;
  } catch (error) {
    console.error("Error loading MP3 file:", error);
    return "";
  }
}
