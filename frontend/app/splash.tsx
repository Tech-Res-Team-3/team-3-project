import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

const LOTTIE_DURATION = 2830; // ms
const EXTRA_DELAY = 1000; // ms to keep splash after animation

export default function SplashScreenScreen() {
  const animation = useRef<LottieView>(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    animation.current?.play();
  }, []);

  useEffect(() => {
    if (animationFinished) {
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          router.replace("/"); // Navigate to index after fade out
        });
      }, EXTRA_DELAY);
      return () => clearTimeout(timer);
    }
  }, [animationFinished, router, opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <LottieView
        ref={animation}
        source={require("../assets/animations/rao-rentals.json")}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        onAnimationFinish={() => setAnimationFinished(true)}
      />
    </Animated.View>
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