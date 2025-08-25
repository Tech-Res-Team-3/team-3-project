import "../styles/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAuthStore } from "../stores/authStore";
import GlobalLoading from "../components/GlobalLoading";
import { useLoadingStore } from "../stores/loadingStore";
import { useProfileCompleteStore } from "../stores/profileCompleteStore";
import { useUserSync } from "../hooks/auth"; // Import your hook

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = useSegments();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseAuthTypes.User | null>(null);
  const user = useAuthStore((state) => state.user);
  const profileComplete = useProfileCompleteStore(
    (state) => state.profileComplete
  );
  const { syncUser } = useUserSync();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      setCheckingAuth(false);

      if (firebaseUser) {
        // Clean: just call your hook!
        try {
          await syncUser();
        } catch (err) {
          console.log("User sync error:", err);
        }
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
  }, [router, segments, syncUser]);

  useEffect(() => {
    if (!profileComplete && pathname !== "/complete-profile") {
      router.replace("/complete-profile");
    }
  }, [profileComplete, pathname, router]);

  useEffect(() => {
    // Show global loading only if not on splash
    if (checkingAuth && pathname !== "/") {
      useLoadingStore.getState().setLoading(true);
    } else {
      useLoadingStore.getState().setLoading(false);
    }
  }, [checkingAuth, pathname]);

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <GlobalLoading />
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
    </SafeAreaProvider>
  );
}
