import { fetchSpeechToText } from "@/app/services/apiSelector";
import { Audio } from "expo-av";
import { useState } from "react";

async function checkAndRequestPermission() {
  console.log("Checking microphone permission...");
  const { status } = await Audio.getPermissionsAsync();
  if (status !== Audio.PermissionStatus.GRANTED) {
    const { status: newStatus } = await Audio.requestPermissionsAsync();
    if (newStatus !== Audio.PermissionStatus.GRANTED) {
      alert("Permission to access microphone is required!");
      return;
    }
  } else {
    console.log("Microphone permission already granted.");
  }
}

export const useAudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<string>("");

  const startRecording = async () => {
    // Check and request permission if needed.
    checkAndRequestPermission();

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Audio mode set.");

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      console.log("Recording prepared.");

      await recording.startAsync();
      console.log("Recording started.");

      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    setIsRecording(false);
    console.log("Recording stopped.");
    console.log("Recording URI:", uri);

    if (uri) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync({ uri });
        await sound.playAsync();
        console.log("Playing recorded audio.");
      } catch (error) {
        console.error("Error playing recorded audio:", error);
      }
    }

    // Transcribe the recording.
    const transcription = await fetchSpeechToText(uri ?? "");
    console.log("Transcription222222:", transcription);
    setTranscription(transcription);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    transcription,
  };
};
