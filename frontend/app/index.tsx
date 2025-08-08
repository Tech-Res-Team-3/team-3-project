import { use, useEffect, useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Button } from "../components/Button";

export default function HomeScreen() {
  const [btnColor, setBtnColor] = useState("bg-ruby");

  const handleTouch = () => {
    setBtnColor(btnColor === "bg-ruby" ? "bg-ruby/20" : "bg-ruby");
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
        <View className="flex-1">
          {/* Logo */}
          <View className="flex-col items-center justify-center gap-9 pt-24">
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
          <View className="absolute bottom-0 left-0 right-0 pb-24 flex-col items-center justify-end gap-6">
            <Link href="/signup" asChild>
              <Button
                title="Sign Up"
                className={btnColor}
                textClassName="text-white"
              ></Button>
            </Link>

            <Button
              title="Login"
              onPress={handleTouch}
              className={`bg-white border-2 border-ruby text-ruby`}
              textClassName="text-ruby"
            ></Button>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
