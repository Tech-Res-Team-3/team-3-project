import "../styles/global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AppSplash from "../components/AppSplash";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <AppSplash onFinish={() => setShowSplash(false)} />;
  }
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
