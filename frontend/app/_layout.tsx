import "../styles/global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getAuth } from "@react-native-firebase/auth";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);

      // Only redirect if trying to access a protected route
      if (!firebaseUser && segments.length > 0 && segments[0] === "(app)") {
        router.replace("/login");
      }
    });
    return unsubscribe;
  }, [router, segments]);

  if (checkingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen name="home" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(app)" />
      </Stack>
    </View>
  );
}
