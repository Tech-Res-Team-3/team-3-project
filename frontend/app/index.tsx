import { View, Text } from "react-native";
import { Link } from "expo-router";
export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the App!</Text>
      <Link href="/profile">Go to Profile</Link>
    </View>
  );
}
