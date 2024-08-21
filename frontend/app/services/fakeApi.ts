import { Language } from "@/app/models/Language";

export const fetchTranslation = async (
  sentence: string,
  outputLanguage: Language
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return `fake translation for: ${sentence} to ${outputLanguage.name}`;
};

export async function fetchAudioBase64(base64Audio: string): Promise<string> {
  if (!base64Audio) return "";
  try {
    // const ssss = await Audio.Sound.createAsync(birdSound);
    // const status = await ssss.sound.getStatusAsync();
    // if (!status.isLoaded) {
    //   throw new Error("Sound is not loaded");
    // }
    // const uri = status.uri as string;
    // const response = await fetch(uri);
    // const arrayBuffer = await response.arrayBuffer();
    // const base64String = btoa(
    //   new Uint8Array(arrayBuffer).reduce(
    //     (data, byte) => data + String.fromCharCode(byte),
    //     ""
    //   )
    // );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return "someBase64String";
  } catch (error) {
    console.error("Error loading MP3 file:", error);
    return "";
  }
}
