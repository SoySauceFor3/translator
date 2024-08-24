import React, { useState } from "react";
import {
  Animated,
  Clipboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface EntryTextProps {
  isFocused: boolean;
  confirmationMode: boolean;
  text: string;
}

enum Colors {
  TEXT = "text-text-secondary",
  TEXT_PRESSED = "text-background",
}

const EntryText: React.FC<EntryTextProps> = ({
  isFocused,
  confirmationMode,
  text,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleLongPress = () => {
    const textToCopy = text;

    Clipboard.setString(textToCopy);
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

  return (
    <View className="flex-1">
      <TouchableOpacity
        onPress={handleLongPress}
        className="flex-row items-start flex-1 relative h-full"
        activeOpacity={1}
      >
        <Text
          className={`${isFocused ? "text-lg" : "text-base"} ${
            confirmationMode ? Colors.TEXT_PRESSED : Colors.TEXT
          }`}
        >
          {text}
        </Text>
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
    </View>
  );
};

export default EntryText;
