import { Stack, useRouter, useSegments, Slot, usePathname } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import * as GeneralIcons from "../../../../components/icons/GeneralIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const NAV_ITEMS = [
  {
    label: "Vehicle Listings",
    icon: GeneralIcons.CarSmallIcon,
    route: "/dashboard/vehicle-listings",
  },
  {
    label: "Claims",
    icon: GeneralIcons.CertificateIcon,
    route: "/dashboard/vehicle-listings/claims",
  },
  {
    label: "Hours & Tools",
    icon: GeneralIcons.HourglassIcon,
    route: "/dashboard/vehicle-listings/hours-tools",
  },
];

export default function VehicleListingsLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active nav item
  const activeIndex = NAV_ITEMS.findIndex((item) => pathname === item.route);

  // Determine screen title
  const screenTitle = NAV_ITEMS[activeIndex]?.label || "Vehicle Listings";

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between px-4 pt-4 pb-3 relative">
          {/* Back Arrow */}
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            className="w-10 h-10 justify-center items-start"
          >
            <Ionicons name="arrow-back" size={32} color="#c41111" />
          </TouchableOpacity>
          {/* Centered Title (absolutely centered) */}
          <View className="absolute left-0 right-0 items-center">
            <Text className="text-3xl font-bold text-gray-900">
              {screenTitle}
            </Text>
          </View>
          {/* Empty view for symmetry */}
          <View className="w-10 h-10" />
        </View>
      </View>

      {/* Navbar */}
      <View className="flex-row justify-around items-center bg-white border-b border-gray-100 mt-2">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <TouchableOpacity
              key={item.label}
              className={`flex-1 items-center py-3 ${isActive ? "border-b-4 border-ruby" : ""}`}
              onPress={() => router.replace(item.route)}
            >
              <item.icon size={28} color={isActive ? "#c41111" : "#888"} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Screen Content */}
      <View className="flex-1">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
