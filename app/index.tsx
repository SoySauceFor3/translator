import { fetchTranslation } from "@/services/api/openai";
import { Pressable, Text } from "react-native";

export default function Index() {
  return (
    <Pressable
      onPress={() => fetchTranslation("Hello")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </Pressable>
  );
}
