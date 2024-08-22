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

  console.log("Playing audio:", base64Audio.slice(0, 100));
  try {
    const { sound } = await Audio.Sound.createAsync({
      uri: `data:audio/mp3;base64,${base64Audio}`,
    });

    await sound.playAsync();

    // Wait for the sound to finish playing
    await new Promise((resolve) => {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          resolve(undefined);
        }
      });
    });

    // Unload the sound
    await sound.unloadAsync();
  } catch (error) {
    console.error("Error playing audio:", error);
  }
}
