import "../styles/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, useRouter, usePathname } from "expo-router";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import { useAuthStore } from "../stores/authStore";
import GlobalLoading from "../components/GlobalLoading";
import { useLoadingStore } from "../stores/loadingStore";
import { useUserSync } from "../hooks/auth";
import { PortalProvider } from "@gorhom/portal";
import { InteractionManager } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const user = useAuthStore((state) => state.user);
  const { syncUser } = useUserSync();
  const globalLoading = useLoadingStore((state) => state.loading);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      console.log("[RootLayout] onAuthStateChanged fired. fbUser:", !!fbUser);
      setFirebaseUser(fbUser);
      if (fbUser) {
        useLoadingStore.getState().setLoading(true);
        try {
          await syncUser();
          console.log("[RootLayout] User sync complete, loading set to false");
        } finally {
          useLoadingStore.getState().setLoading(false);
        }
      } else {
        useAuthStore.getState().clearUser();
        useLoadingStore.getState().setLoading(false);
        console.log("[RootLayout] User logged out, loading set to false");
      }
    });
    return unsubscribe;
  }, []);

  // Navigation effect: only redirect when truly needed
  useEffect(() => {
    if (globalLoading) {
      console.log("[NavEffect] Waiting: loading or globalLoading is true");
      return;
    }
    let interaction: any;
    let timeout: any;

    interaction = InteractionManager.runAfterInteractions(() => {
      timeout = setTimeout(() => {
        console.log(
          "[NavEffect] Running navigation logic. Path:",
          pathname,
          "firebaseUser:",
          !!firebaseUser,
          "user:",
          !!user
        );
        if (
          !firebaseUser &&
          (pathname.startsWith("/(app)") || pathname === "/")
        ) {
          if (pathname !== "/home") {
            console.log("[NavEffect] Redirecting to /home");
            router.replace("/home");
          }
        } else if (
          firebaseUser &&
          user &&
          ["/login", "/signup", "/", "/home"].includes(pathname)
        ) {
          console.log("[NavEffect] Redirecting to /(app)");
          router.replace("/(app)");
        }
      }, 200); // <-- Increase delay to 100ms or more
    });

    return () => {
      if (interaction) interaction.cancel();
      if (timeout) clearTimeout(timeout);
    };
  }, [firebaseUser, user, globalLoading, pathname, router]);

  if (!firebaseUser) {
    console.log(
      "(app) layout: No Firebase auth - showing GlobalLoading while root layout handles redirect"
    );
  }

  if (!user) {
    console.log(
      "(app) layout: Firebase user exists but Zustand user syncing - showing loading"
    );
  }

  console.log("(app) layout: Rendering authenticated Stack");

  // Render the stack and always overlay GlobalLoading
  return (
    <SafeAreaProvider>
      <PortalProvider>
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
          </Stack>
          <GlobalLoading />
        </View>
      </PortalProvider>
    </SafeAreaProvider>
  );
}
