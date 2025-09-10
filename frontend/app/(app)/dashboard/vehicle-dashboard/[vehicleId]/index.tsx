import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as VehicleDashboardIcons from "../../../../../components/icons/dashboard/vehicle/VehicleDashboardIcons";
// import your icons as needed

const menuItems = [
  {
    label: "Calendar",
    route: "calendar",
    icon: VehicleDashboardIcons.CalendarIcon,
  },
  {
    label: "Pricing & Discounts",
    route: "pricing",
    icon: VehicleDashboardIcons.PricesIcon,
  },
  {
    label: "Location & Delivery",
    route: "location",
    icon: VehicleDashboardIcons.LocationIcon,
  },
  {
    label: "Guest Instructions",
    route: "guest-instructions",
    icon: VehicleDashboardIcons.InstructionsIcon,
  },
  { label: "Photos", route: "photos", icon: VehicleDashboardIcons.PhotosIcon },
  {
    label: "Details",
    route: "details",
    icon: VehicleDashboardIcons.DetailsIcon,
  },
  {
    label: "Pickup & Return Hours",
    route: "pickup-return-hours",
    icon: VehicleDashboardIcons.ClockIcon,
  },
  { label: "Extras", route: "extras", icon: VehicleDashboardIcons.ExtrasIcon },
  {
    label: "Distance Included",
    route: "distance-included",
    icon: VehicleDashboardIcons.DistanceIcon,
  },
  { label: "Goals", route: "goals", icon: VehicleDashboardIcons.GoalsIcon },
  {
    label: "Trip Preferences",
    route: "trip-preferences",
    icon: VehicleDashboardIcons.PreferencesIcon,
  },
];

export default function VehicleDashboardScreen() {
  const router = useRouter();
  const { vehicleId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingVertical: 20 }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => (
          <Link key={item.label} href={item.route} asChild>
            <TouchableOpacity
              activeOpacity={0.4}
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
