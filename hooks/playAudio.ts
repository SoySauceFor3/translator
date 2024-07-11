import { Audio } from "expo-av";

/**
 * Plays an audio file from a base64 encoded string.
 * @param base64Audio - The base64 encoded audio string.
 */
export async function playAudio(base64Audio: string): Promise<void> {
  if (!base64Audio) return;

  try {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: `data:audio/mp3;base64,${base64Audio}`,
    });
    await sound.playAsync();
  } catch (error) {
    console.error("Error playing audio:", error);
  }
}
