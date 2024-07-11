import { Language } from "@/types";
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
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    if (!mp3.ok) {
      throw new Error("Failed to fetch audio");
    }

    const arrayBuffer = await mp3.arrayBuffer();
    return arrayBufferToBase64(arrayBuffer);
  } catch (error) {
    console.error("Error fetching audio:", error);
    return "";
  }
}
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
