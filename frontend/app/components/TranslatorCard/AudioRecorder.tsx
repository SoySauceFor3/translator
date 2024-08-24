import { useInputText } from "@/app/contexts/InputTextContext";
import { useAudioRecorder } from "@/app/hooks/useAudioRecorder";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";

export default function AudioRecorder() {
  const { isRecording, startRecording, stopRecording, transcription } =
    useAudioRecorder();
  const { setInputText } = useInputText();

  useEffect(() => {
    if (transcription) {
      setInputText(transcription);
    }
  }, [transcription, setInputText]);

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
