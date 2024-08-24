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

export const fetchSpeechToText = async (uri: string): Promise<string> => {
  console.log("FAKE speech to text for URI:", uri);

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate a fake transcription
  const fakeTranscriptions = [
    "This is a fake transcription of the audio.",
    "Hello, this is a test of the speech to text function.",
    "The quick brown fox jumps over the lazy dog.",
    "Welcome to the world of artificial intelligence and machine learning.",
  ];

  const randomIndex = Math.floor(Math.random() * fakeTranscriptions.length);
  return fakeTranscriptions[randomIndex];
};
