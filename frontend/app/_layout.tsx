import "../styles/global.css";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-white">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* No splash screen route needed; index.tsx is now the splash */}
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen name="home" />
        <Stack.Screen name="signup" />
      </Stack>
    </View>
  );
}
