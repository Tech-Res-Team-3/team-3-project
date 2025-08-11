import "../styles/global.css";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-white">
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" options={{ animation: "fade" }} />
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
      </Stack>
    </View>
  );
}