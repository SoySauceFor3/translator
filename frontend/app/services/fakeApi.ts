import { Language } from "@/app/models/Language";
import { Audio } from "expo-av";

import birdSound from "@/assets/bird-sound.mp3";

export const fetchTranslation = async (
  sentence: string,
  outputLanguage: Language
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return `fake translation for: ${sentence} to ${outputLanguage.name}`;
};

export async function fetchAudioBase64(inputText: string): Promise<string> {
  console.log("FAKE fetching audio for ", inputText);
  if (!inputText) return "";

  try {
    const so = await Audio.Sound.createAsync(birdSound);
    const status = await so.sound.getStatusAsync();
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
    // Simulate a delay of 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return base64String;
  } catch (error) {
    console.error("Error loading MP3 file:", error);
    return "";
  }
}
