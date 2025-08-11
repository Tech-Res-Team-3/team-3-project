import { ExpoConfig } from "expo/config";
import 'tsx/cjs';

const config: ExpoConfig = {
  backgroundColor: "#c41111",
  name: "Rao Rentals",
  slug: "raorentals",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/transparent.png",
    resizeMode: "contain",
    backgroundColor: "#c41111"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/rao-app-icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true,
    package: "com.raorentals.app"
  },
  scheme: "your-app-scheme",
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png"
  },
  plugins: [
    "./plugins/withCustomGradle",
    "expo-router"
  ],
  extra: {
    router: {},
    eas: {
      projectId: "8325b167-585a-494a-b40e-f2d3505daa22"
    }
  }
};

export default config;