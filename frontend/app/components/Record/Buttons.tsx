import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface ButtonsProps {
  isConfirmPressed: boolean;
  onPress: () => void;
  onRelease: () => void;
  onMove: (position: number) => void;
  playAudio: () => void;
  children: React.ReactNode;
}

export default function Buttons({
  isConfirmPressed,
  onPress,
  onRelease,
  onMove,
  playAudio,
  children,
}: ButtonsProps) {
  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderGrant={onPress}
      onResponderRelease={onRelease}
      onResponderMove={(e) => onMove(e.nativeEvent.locationX)}
    >
      {isConfirmPressed ? (
        children
      ) : (
        <View className="flex-row space-x-2">
          <View className="p-2 rounded-full bg-secondary-light">
            <Icon name="check" size={18} color="#3E2723" />
          </View>
          <TouchableOpacity
            onPress={playAudio}
            className="p-2 bg-secondary-light rounded-full"
          >
            <Icon name="volume-up" size={18} color="#3E2723" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
