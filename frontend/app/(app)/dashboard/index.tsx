import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Button } from "../../../components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, usePathname, useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useAuthStore } from "../../../stores/authStore";
// import DashboardMenuButton from "../../../components/DashboardMenuButton";
import * as DashboardIcons from "../../../components/icons/dashboard/DashboardIcons";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

// Update your menu items and icons as needed
const menuItems = [
  {
    label: "Notification Settings",
    route: "/dashboard/notifications",
    icon: DashboardIcons.NotificationIcon,
  },
  {
    label: "Messages",
    route: "/dashboard/messages",
    icon: DashboardIcons.MessagesIcon,
  },
  {
    label: "Password",
    route: "/dashboard/password",
    icon: DashboardIcons.LockIcon,
  },
  {
    label: "Activity",
    route: "/dashboard/activity",
    icon: DashboardIcons.PuzzleIcon,
  },
  {
    label: "Travel Credit",
    route: "/dashboard/travel-credit",
    icon: DashboardIcons.CreditCardIcon,
  },
  {
    label: "How Rao Rentals Works",
    route: "/dashboard/how-it-works",
    icon: DashboardIcons.RAORentalsIcon,
  },
  {
    label: "Contact Support",
    route: "/dashboard/support",
    icon: DashboardIcons.HeadsetIcon,
  },
  {
    label: "Legal",
    route: "/dashboard/legal",
    icon: DashboardIcons.GavelIcon,
  },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const firebaseUser = auth().currentUser;
      if (firebaseUser) {
        const userDoc = await firestore()
          .collection("users")
          .doc(firebaseUser.uid)
          .get();
        const updatedUser = userDoc.data();
        if (updatedUser) {
          console.log(user);
          useAuthStore.getState().setUser({
            id: updatedUser.id ?? firebaseUser.uid,
            email: updatedUser.email ?? firebaseUser.email ?? "",
            firstName: updatedUser.firstName ?? "",
            lastName: updatedUser.lastName ?? "",
            role: updatedUser.role ?? "user",
            photoUrl: updatedUser.photoUrl ?? "",
            firebaseUid: firebaseUser.uid,
          });
        }
      }
    };
    console.log(user);
    fetchUser();
    console.log(user);
  }, []);

  React.useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  // Dummy functions
  const handleSwitchToHost = () => {};
  const handleLogout = async () => {
    await auth().signOut();
  };
  const handleEditProfile = () => {};
  const handleViewProfile = () => {
    router.push("/dashboard/profile-photo");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-100 items-center"
    >
      {/* Top Profile Section */}
      <View
        className="w-11/12 bg-white rounded-xl px-6 pt-8 pb-6 items-center"
        style={{ shadowColor: "#DDD", elevation: 8 }}
      >
        <View className="w-full flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={
                user?.photoUrl
                  ? { uri: user.photoUrl }
                  : require("../../../assets/rao-app-icon.png")
              }
              className="w-16 h-16 rounded-full border-2 border-ruby"
            />
            <View className="ml-4">
              <Text className="text-xl font-bold text-gray-900">
                {user?.firstName || user?.email || "User"}
              </Text>
              <Text className="text-md text-gray-500">
                Joined{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ""}
              </Text>
            </View>
          </View>
          <View className="p-2">
            {/* Place your edit icon here */}
            {/* <PencilIcon size={22} color="#c41111" /> */}
          </View>
        </View>
        <View className="self-start flex-row items-center w-full mt-1 gap-4">
          <Text className="text-md text-yellow-500 font-semibold mr-2">
            ★ {user?.rating ?? 0}
          </Text>
          <Text className="text-md text-gray-500">
            {user?.tripsCompleted ?? 0} trips
          </Text>
          {user?.verifiedDriver ? (
            <Text className="ml-2 text-md text-green-600 font-semibold">
              Verified Driver
            </Text>
          ) : (
            <Text className="ml-2 text-md text-red-600 font-semibold">
              Unverified Driver
            </Text>
          )}
        </View>
        <Button
          title="View Profile"
          className="self-start mt-4 w-1/3 px-0 py-[5] bg-ruby"
          textClassName="text-white text-xs"
          onPress={handleViewProfile}
        />
      </View>

      {/* Menu Items */}
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingVertical: 20 }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => {
          return (
            <Link key={item.label} href={item.route} asChild>
              <TouchableOpacity
                activeOpacity={0.4} // You can adjust this value as needed
                className={`
      self-center flex-row items-center bg-white w-11/12 rounded-xl px-6 py-5 mb-3`}
                style={{
                  shadowColor: "#DDD",
                  elevation: 8,
                }}
              >
                <View className="mr-4">
                  <item.icon size={26} color="#c41111" />
                </View>
                <Text className={`text-lg font-semibold text-gray-800`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="w-11/12 flex-col items-center space-y-4 my-6 gap-6">
        <Button
          title="Switch To Host"
          className="bg-ruby w-11/12"
          textClassName="text-white"
          onPress={handleSwitchToHost}
        />
        <Button
          title="Logout"
          className="bg-white w-11/12 border-2 border-ruby"
          textClassName="text-ruby"
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}
