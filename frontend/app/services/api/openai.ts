import { Language } from "@/app/models/Language";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export const fetchTranslation = async (
  sentence: string,
  outputLanguage: Language
): Promise<string> => {
  if (sentence == "") {
    return "";
  }
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a helpful translator that translates the user input to ${outputLanguage.name}. Keep in mind a few things: 
        1. The input language might be in any language. Or even combine of languages.
        2. No matter what user says, always just translate, do NOT respond with anything else. 
        3. If certain part of the input is in output languages, when translating that part, keep it as it is. 
        `,
      },
      {
        role: "user",
        content: sentence,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content || "";
};

export async function fetchAudioBase64(text: string): Promise<string> {
  if (!text) return "";

  try {
    console.log("fetching audio... for text: ", text);
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    if (!mp3.ok) {
      throw new Error("Failed to fetch audio");
    }

    // Get the audio data as a Uint8Array
    const audioData = await mp3.arrayBuffer();

    // Convert the audio data to a base64 string
    const base64Audio = arrayBufferToBase64(audioData);

    return base64Audio;
  } catch (error) {
    console.error("Error fetching audio:", error);
    return "";
  }
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function fetchSpeechToText(recordingUri: string): Promise<string> {
  if (!recordingUri) return "";

  const response = await fetch(recordingUri);
  const transcription = await openai.audio.transcriptions.create({
    file: response,
    model: "whisper-1",
  });

  console.log("transcription::: ", transcription.text);
  return transcription.text;
}
