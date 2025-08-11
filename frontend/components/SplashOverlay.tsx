import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";

const LOTTIE_DURATION = 2830;
const EXTRA_DELAY = 1000;

export default function SplashOverlay({ onFinish }: { onFinish: () => void }) {
  const animation = useRef<LottieView>(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animation.current?.play();
  }, []);

  useEffect(() => {
    if (animationFinished) {
      const timer = setTimeout(() => {
        // Fade out logo first
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          // Then fade out background
          Animated.timing(opacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            onFinish();
          });
        });
      }, EXTRA_DELAY);
      return () => clearTimeout(timer);
    }
  }, [animationFinished, onFinish, opacity, logoOpacity]);

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.View style={{ opacity: logoOpacity }}>
        <LottieView
          ref={animation}
          source={require("../assets/animations/rao-rentals.json")}
          autoPlay={false}
          loop={false}
          style={styles.lottie}
          onAnimationFinish={() => setAnimationFinished(true)}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#c41111",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
