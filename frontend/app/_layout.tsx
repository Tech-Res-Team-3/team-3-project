import "../styles/global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAuthStore } from "../stores/authStore";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:3333";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);

      if (firebaseUser) {
        // Get the latest idToken
        const idToken = await firebaseUser.getIdToken();
        console.log("User logged in:", firebaseUser.email);

        // Send to backend
        await fetch(`${API_URL}/users/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({}),
        })
          .then((res) =>
            res.json().then((data) => {
              console.log("Backend response:", data);
              if (data.user) {
                useAuthStore.getState().setUser(data.user);
              }
            })
          )
          .catch((err) => console.log("Fetch error:", err));
      } else {
        console.log("User logged out, clearing Zustand user");
        useAuthStore.getState().clearUser();
      }

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
