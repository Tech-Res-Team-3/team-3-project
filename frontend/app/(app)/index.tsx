import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
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
        className="w-4/5 bg-white rounded-2xl mb-2 justify-center items-center"
        style={[
          styles.shadow,
          { marginTop: height * 0.13, height: height * 0.165 },
        ]}
      >
        <Text className="font-bold text-lg">Top Section 1</Text>
      </View>
      <View
        className="w-4/5 bg-white rounded-2xl mb-4 justify-center items-center"
        style={[styles.shadow, { height: height * 0.165 }]}
      >
        <Text className="font-bold text-lg">Top Section 2</Text>
      </View>

      {/* Transparent section (about 10% height) */}
      <View
        className="w-4/5 justify-center items-center mb-2"
        style={{ height: height * 0.1, backgroundColor: "transparent" }}
      >
        <Text className="text-xl text-gray-800">City, Address, Airport</Text>
      </View>

      {/* Main box with shadow (about 40% height) */}
      <View
        className="w-4/5 bg-white rounded-2xl justify-center items-center"
        style={[
          styles.shadowMain,
          { height: height * 0.38, marginBottom: height * 0.04 },
        ]}
      >
        <Text className="text-lg text-gray-500">Main Content Box</Text>
      </View>

      {/* Fixed bottom button */}
      <View
        className="absolute w-full bg-white justify-center items-center"
        style={[styles.shadowBottom, { bottom: 0, height: height / 6 }]}
      >
        <Button title="View Rentals" onPress={() => {}} className="w-5/6" />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  shadowMain: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 6,
  },
  shadowBottom: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
});
