import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { useAudioRecorder } from "../hooks/useAudioRecorder";

export default function AudioRecorder() {
  const { isRecording, startRecording, stopRecording, recordingUri } =
    useAudioRecorder();

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
