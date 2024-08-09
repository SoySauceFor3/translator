import { useAudioRecorder } from "@/app/hooks/useAudioRecorder";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";

interface AudioRecorderProps {
  onTranscription: (transcription: string) => void; // Whatever the caller want this component to do.
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
    <TouchableOpacity
      className={`w-14 h-14 rounded-full ${
        isRecording ? "bg-primary" : "bg-accent"
      } items-center justify-center shadow-md`}
      onPress={isRecording ? stopRecording : startRecording}
    >
      <Ionicons name={isRecording ? "stop" : "mic"} size={28} color="white" />
    </TouchableOpacity>
  );
}
