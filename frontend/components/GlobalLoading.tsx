import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { useLoadingStore } from "../stores/loadingStore";

export default function GlobalLoading() {
  const loading = useLoadingStore((state) => state.loading);
  const opacity = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [loading, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <LottieView
        source={require("../assets/animations/rao-loading.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
