import "../styles/global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);

      if (firebaseUser) {
        // Get the latest idToken
        const idToken = await firebaseUser.getIdToken();
        console.log("ID Token:", idToken);

        // Send to backend
        await fetch("http://10.0.0.48:3333/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({}),
        })
          .then((res) =>
            res.json().then((data) => console.log("Backend response:", data))
          )
          .catch((err) => console.log("Fetch error:", err));
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
