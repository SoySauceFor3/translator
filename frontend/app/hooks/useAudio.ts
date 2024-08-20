import { Audio } from "expo-av";

export function useAudio(): {
  playAudio: (base64Audio: string) => Promise<void>;
} {
  return {
    playAudio,
  };
}

/**
 * Plays an audio file from a base64 encoded string.
 * @param base64Audio - The base64 encoded audio string.
 */
async function playAudio(base64Audio: string): Promise<void> {
  if (!base64Audio) return;

  console.log("Playing audio:", base64Audio);
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
