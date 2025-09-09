import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import your icons as needed

const menuItems = [
  { label: "Calendar", route: "calendar" },
  { label: "Pricing & Discounts", route: "pricing" },
  { label: "Location & Delivery", route: "location" },
  { label: "Guest Instructions", route: "guest-instructions" },
  { label: "Photos", route: "photos" },
  { label: "Details", route: "details" },
  { label: "Pickup & Return Hours", route: "pickup-return-hours" },
  { label: "Extras", route: "extras" },
  { label: "Distance Included", route: "distance-included" },
  { label: "Goals", route: "goals" },
  { label: "Trip Preferences", route: "trip-preferences" },
];

export default function VehicleDashboardScreen() {
  const router = useRouter();
  const { vehicleId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      <Text className="text-2xl font-bold text-gray-900 mt-8 mb-6 self-center">
        Vehicle Dashboard
      </Text>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            className="self-center flex-row items-center bg-white w-11/12 rounded-xl px-6 py-5 mb-3"
            onPress={() =>
              router.push(
                `/dashboard/vehicle-dashboard/${vehicleId}/${item.route}`
              )
            }
          >
            {/* Add icon here if desired */}
            <Text className="text-lg font-semibold text-gray-800">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
