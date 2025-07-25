import { View, Text } from "react-native";
import { router } from "expo-router";
import { Button } from "../components/Button";
export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
