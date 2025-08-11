import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LOTTIE_DURATION = 2830; // ms
const EXTRA_DELAY = 1000; // ms to keep splash after animation

export default function AppSplash({ onFinish }: { onFinish: () => void }) {
  const animation = useRef<LottieView>(null);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
    animation.current?.play();
  }, []);

  useEffect(() => {
    if (animationFinished) {
      const timer = setTimeout(onFinish, EXTRA_DELAY);
      return () => clearTimeout(timer);
    }
  }, [animationFinished, onFinish]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require("../assets/animations/rao-rentals.json")}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        onAnimationFinish={() => setAnimationFinished(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c41111",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
