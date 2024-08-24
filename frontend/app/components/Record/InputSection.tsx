import { useInputText } from "@/app/contexts/InputTextContext";
import { useAudio } from "@/app/hooks/useAudio";
import { Record } from "@/app/models/Record";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Clipboard,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface InputSectionProps {
  item: Record;
  isFocused: boolean;
}

export default function InputSection({ item, isFocused }: InputSectionProps) {
  const isTTSAvailable = item.input.TTS.trim() !== "";
  const { playAudio } = useAudio();

  const text = item.input.text;

  const { setInputText } = useInputText();
  const putTextToInputWindow = () => {
    setInputText(text);
  };

  const [fadeAnim] = useState(new Animated.Value(0));
  const [pressAnim] = useState(new Animated.Value(0));
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const startLongPress = useCallback(() => {
    setIsLongPress(false);
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    longPressTimeout.current = setTimeout(() => {
      setIsLongPress(true);
      putTextToInputWindow();
      Vibration.vibrate(100); // Provide haptic feedback
    }, 1000);
  }, []);

  const endLongPress = useCallback(() => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
    Animated.timing(pressAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  const copyText = () => {
    Clipboard.setString(text);
    console.log("copied");

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(700),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (!isLongPress) {
      copyText();
    }
    setIsLongPress(false);
  };

  const interpolatedColor = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.1)"],
  });

  return (
    <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-200">
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        onPressIn={startLongPress}
        onPressOut={endLongPress}
        className="flex-1 mr-2"
      >
        <Animated.View
          style={{ backgroundColor: interpolatedColor, borderRadius: 8 }}
        >
          <Text
            className={`${isFocused ? "text-2xl" : "text-xl"} font-bold text-text-primary p-2`}
          >
            {item.input.text}
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeAnim,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 8,
          }}
        >
          <Text className="text-white font-bold">Text copied to clipboard</Text>
        </Animated.View>
      </TouchableOpacity>
      {isFocused && (
        <TouchableOpacity
          onPress={() => isTTSAvailable && playAudio(item.input.TTS)}
          className={`p-3 rounded-full shadow-sm ${isTTSAvailable ? "bg-primary-light" : "bg-gray-300"}`}
          disabled={!isTTSAvailable}
        >
          <Icon
            name="volume-up"
            size={24}
            color={isTTSAvailable ? "#3E2723" : "#999999"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
