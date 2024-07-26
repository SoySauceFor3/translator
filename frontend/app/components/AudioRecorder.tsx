import { useAudioRecorder } from "@/app/hooks/useAudioRecorder";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View } from "react-native";

interface AudioRecorderProps {
  onTranscription: (transcription: string) => void;
}

export default function AudioRecorder({ onTranscription }: AudioRecorderProps) {
  const { isRecording, startRecording, stopRecording, transcription } =
    useAudioRecorder();

  useEffect(() => {
    if (transcription) {
      onTranscription(transcription);
    }
  }, [transcription, onTranscription]);

  return (
    <View>
      <Ionicons
        name={isRecording ? "stop-circle" : "mic-circle"}
        size={64}
        color="red"
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
}
