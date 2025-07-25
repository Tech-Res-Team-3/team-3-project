import React from "react";
import { View, Text } from "react-native";
import "./styles/global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Text className="text-3xl font-bold text-blue-500">
        Welcome to NativeWind!
      </Text>
    </View>
  );
}
