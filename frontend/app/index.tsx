import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SplashOverlay from "../components/SplashOverlay";
import HomeScreen from "./home"; // Import your home screen component

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.container}>
      <HomeScreen />
      {showSplash && <SplashOverlay onFinish={() => setShowSplash(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // or your home screen's background
  },
});
