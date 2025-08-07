import "../styles/global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 9000); // 9 second delay
    return () => clearTimeout(timer);
  }, []);
  return (
    <View className="flex-1 bg-white">
      <Stack
        screenOptions={{
          headerShown: false, // Hide the default nav bar
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
      </Stack>
    </View>
  );
}
