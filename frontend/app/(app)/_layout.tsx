import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { getAuth } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import { useAuthStore } from "../../stores/authStore";
import GlobalLoading from "../../components/GlobalLoading";

export default function RootLayout() {
  const user = useAuthStore((state) => state.user);

  // Check auth state directly
  const app = getApp();
  const auth = getAuth(app);
  const firebaseUser = auth.currentUser;

  // If no Firebase user, redirect (handled by root layout)
  if (!firebaseUser) {
    console.log("(app) layout: No Firebase auth - showing GlobalLoading while root layout handles redirect");
    return (
      <View className="flex-1 bg-white">
        <GlobalLoading />
      </View>
    );
  }

  // If Firebase user exists but no Zustand user yet, show loading while sync happens
  if (!user) {
    console.log("(app) layout: Firebase user exists but Zustand user syncing - showing loading");
    return (
      <View className="flex-1 bg-white">
        <GlobalLoading />
      </View>
    );
  }

  // Only render when fully authenticated and synced
  console.log("(app) layout: Rendering authenticated Stack");
  return (
    <View className="flex-1 bg-gray-300">
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true, // Enable gestures for normal navigation
          animation: 'slide_from_right', // Default animation
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{
            gestureEnabled: false, // Only disable for main screen to prevent accidental back
            headerLeft: () => null,
            animation: 'none',
          }}
        />
        <Stack.Screen 
          name="complete-profile" 
          options={{
            gestureEnabled: true, // Allow normal back navigation
          }}
        />
        <Stack.Screen 
          name="dashboard" 
          options={{
            gestureEnabled: true, // Allow swipe back navigation
            presentation: 'modal', // Make it behave like a modal
            animation: 'slide_from_left', // Slide in from left
            animationDuration: 300, // Smooth animation
            gestureDirection: 'horizontal', // Allow horizontal swipe back
          }}
        />
      </Stack>
    </View>
  );
}