import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

export default function AppSplash({ onFinish }: { onFinish: () => void }) {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
    // Set a timer for the animation duration (e.g., 2.8s)
    const timer = setTimeout(onFinish, 2830);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require("../assets/animations/rao-rentals.json")}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
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