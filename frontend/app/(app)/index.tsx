import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Switch } from "react-native-switch";
import { Button } from "../../components/Button";
import { HamburgerIcon } from "../../components/icons/HamburgerIcon";
import { BellIcon } from "../../components/icons/BellIcon";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

const { height, width } = Dimensions.get("window");

export default function MainAppScreen() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(true);
  const [isCurrentLocationEnabled, setIsCurrentLocationEnabled] =
    useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      setLoading(false);
      if (!userState) {
        router.replace("/login");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await auth().signOut();
    // The onAuthStateChanged listener will handle redirecting to login
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <View className="flex-1 bg-gray-100 items-center">
      {/* Top circle buttons */}
      <View
        className="absolute flex-row justify-between z-10"
        style={{ top: 40, left: 30, width: width - 60 }}
      >
        <TouchableOpacity style={styles.circleButton}>
          <HamburgerIcon size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleLogout}>
          <Text style={{ fontSize: 18, color: "#c00" }}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <BellIcon size={30} />
        </TouchableOpacity>
      </View>

      {/* Two stacked views at the top (each about 1/6 of height, together ~1/3) */}
      <View
        className="flex flex-col w-5/6 bg-white rounded-2xl mb-6 items-center py-6 gap-3"
        style={[styles.shadow, { marginTop: height * 0.1 }]}
      >
        <Text className="font-semibold text-2xl self-start px-6">
          City, Address, Airport
        </Text>
        <TextInput
          className="border-none rounded-full bg-gray-100 w-11/12 px-6 py-5"
          placeholder="Los Angeles, CA"
          placeholderTextColor="#d1d5db"
        />
      </View>
      <View
        className="flex flex-col w-5/6 bg-white rounded-2xl mb-6 items-center py-6 gap-3"
        style={[styles.shadow]}
      >
        <Text className="font-semibold text-2xl self-start px-6">When?</Text>
        <TextInput
          className="border-none rounded-full bg-gray-100 w-11/12 px-6 py-5"
          placeholder="Dec 17, 2025 - Dec 19, 2025"
          placeholderTextColor="#d1d5db"
        />
      </View>

      {/* Transparent section (about 10% height) */}
      <View
        className="w-3/4 justify-center py-6"
        style={{ backgroundColor: "transparent" }}
      >
        <View className="flex flex-row justify-between">
          <Text className="text-xl text-gray-800">
            Driver's age is 25 or above:
          </Text>
          <Switch
            value={isEnabled}
            onValueChange={setIsEnabled}
            disabled={false}
            circleSize={30}
            barHeight={30}
            circleBorderWidth={2}
            circleBorderActiveColor="#c41111"
            circleBorderInactiveColor="#d1d5db"
            backgroundActive={"#c41111"}
            backgroundInactive={"#d1d5db"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={3}
            switchRightPx={3}
            switchBorderRadius={30}
            switchWidthMultiplier={1.5}
          />
        </View>

        <Text className="text-md text-gray-400">
          In order to carry on you need to verify your age
        </Text>
      </View>

      {/* Main box with shadow (about 40% height) */}
      <View
        className="w-5/6 bg-white rounded-2xl justify-center items-center"
        style={[
          styles.shadowMain,
          { height: height * 0.3, marginBottom: height * 0.04 },
        ]}
      >
        {/* Header section for the map */}
        <View className="w-full flex-row items-center justify-between px-6 py-3 border-b border-gray-100">
          <Text className="text-2xl font-semibold text-gray-800">
            Current Location
          </Text>
          <Switch
            value={isCurrentLocationEnabled}
            onValueChange={setIsCurrentLocationEnabled}
            circleSize={30}
            barHeight={30}
            circleBorderWidth={2}
            circleBorderActiveColor="#c41111"
            circleBorderInactiveColor="#d1d5db"
            backgroundActive={"#c41111"}
            backgroundInactive={"#d1d5db"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={3}
            switchRightPx={3}
            switchBorderRadius={30}
            switchWidthMultiplier={1.5}
          />
        </View>

        {/* Map content placeholder */}
        <View className="flex-1 justify-center items-center w-full">
          <Text className="text-lg text-gray-500">Map Content</Text>
        </View>
      </View>

      {/* Fixed bottom button */}
      <View
        className="absolute w-full bg-white justify-center items-center"
        style={[styles.shadowBottom, { bottom: 0, height: height / 8 }]}
      >
        <Button
          title="View Rentals"
          onPress={() => {}}
          className="w-11/12 bg-ruby"
          textClassName="text-white"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#888",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
  },
  shadow: {
    shadowColor: "#CCC",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 10,
  },
  shadowMain: {
    shadowColor: "#CCC",
    shadowOffset: { width: 6, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 10,
  },
  shadowBottom: {
    shadowColor: "#CCC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },
});
