import "../styles/global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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
    <Stack
      screenOptions={{
        headerShown: false, // Hide the default nav bar
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
