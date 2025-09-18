import { use, useEffect, useState } from "react";
import { View, Image, ImageBackground, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../stores/authStore";
import { getAuth } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import { useLoadingStore } from "../stores/loadingStore";
import LottieView from "lottie-react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [lottieDone, setLottieDone] = useState(false);

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
        <View className="absolute inset-0 bg-white/55" pointerEvents="none" />
        <SafeAreaView className="flex-1">
          {/* Logo */}
          <View className="flex-col items-center justify-center">
            {/* Lottie Animation */}
            <LottieView
              source={require("../assets/animations/rao-home-screen.json")}
              autoPlay
              loop={false}
              style={{ width: 300, height: 300 }} // h-44 = 176px
              onAnimationFinish={() => setLottieDone(true)}
            />
            {/* Sub Logo fades in after Lottie */}
            {lottieDone && (
              <Animated.Image
                entering={FadeIn.duration(700)}
                source={require("../assets/logo-sub.png")}
                style={{ width: "50%", height: 36 }} // h-9 = 36px
                resizeMode="contain"
              />
            )}
          </View>
          {/* Buttons */}
          <View className="absolute bottom-0 left-0 right-0 pb-20 flex-col items-center justify-end gap-6">
            <Link href="/signup" asChild>
              <Button
                title="Sign Up"
                className="py-6 bg-ruby w-11/12"
                textClassName="text-xl text-white"
              ></Button>
            </Link>

            <Button
              title="Login"
              className="py-6 bg-white border-2 border-ruby w-11/12"
              textClassName="text-xl text-ruby"
              onPress={handleLoginPress}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
