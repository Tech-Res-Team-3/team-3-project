import { use, useEffect, useState } from "react";
import { View, Image, ImageBackground, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../stores/authStore";
import { getAuth } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  
  // Check if user is authenticated when they press login button
  const handleLoginPress = () => {
    // Check if user is already authenticated
    const app = getApp();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;
    
    if (firebaseUser && user) {
      console.log("Authenticated user pressed login, redirecting to /(app)");
      router.replace("/(app)");
    } else {
      console.log("Unauthenticated user pressed login, navigating to /login");
      router.push("/login");
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/city-background.jpg")}
        className="flex-1"
        resizeMode="cover"
      >
        {/* Overlay */}
        <View className="absolute inset-0 bg-white/40" pointerEvents="none" />
        <SafeAreaView className="flex-1">
          {/* Logo */}
          <View className="flex-col items-center justify-center gap-9 pt-20">
            <Image
              source={require("../assets/logo-main.png")}
              className="w-3/4 h-44"
              resizeMode="contain"
            />
            <Image
              source={require("../assets/logo-sub.png")}
              className="w-2/4 h-9"
              resizeMode="contain"
            />
          </View>
          {/* Buttons */}
          <View className="absolute bottom-0 left-0 right-0 pb-20 flex-col items-center justify-end gap-6">
            <Link href="/signup" asChild>
              <Button
                title="Sign Up"
                className="bg-ruby w-11/12"
                textClassName="text-white"
              ></Button>
            </Link>

            <Button
              title="Login"
              className="bg-white border-2 border-ruby w-11/12"
              textClassName="text-ruby"
              onPress={handleLoginPress}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
