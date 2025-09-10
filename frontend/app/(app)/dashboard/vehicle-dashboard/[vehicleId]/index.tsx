import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as VehicleDashboardIcons from "../../../../../components/icons/dashboard/vehicle/VehicleDashboardIcons";
import { useVehicleStore } from "../../../../../stores/vehicleStore";

const menuItems = [
  {
    label: "Calendar",
    route: "./[vehicleId]/calendar",
    icon: VehicleDashboardIcons.CalendarIcon,
  },
  {
    label: "Pricing & Discounts",
    route: "./[vehicleId]/prices",
    icon: VehicleDashboardIcons.PricesIcon,
  },
  {
    label: "Location & Delivery",
    route: "./[vehicleId]/location",
    icon: VehicleDashboardIcons.LocationIcon,
  },
  {
    label: "Guest Instructions",
    route: "./[vehicleId]/instructions",
    icon: VehicleDashboardIcons.InstructionsIcon,
  },
  {
    label: "Photos",
    route: "./[vehicleId]/photos",
    icon: VehicleDashboardIcons.PhotosIcon,
  },
  {
    label: "Details",
    route: "./[vehicleId]/details",
    icon: VehicleDashboardIcons.DetailsIcon,
  },
  {
    label: "Pickup & Return Hours",
    route: "./[vehicleId]/hours",
    icon: VehicleDashboardIcons.ClockIcon,
  },
  {
    label: "Extras",
    route: "./[vehicleId]/extras",
    icon: VehicleDashboardIcons.ExtrasIcon,
  },
  {
    label: "Distance Included",
    route: "./[vehicleId]/distance",
    icon: VehicleDashboardIcons.DistanceIcon,
  },
  {
    label: "Goals",
    route: "./[vehicleId]/goals",
    icon: VehicleDashboardIcons.GoalsIcon,
  },
  {
    label: "Trip Preferences",
    route: "./[vehicleId]/preferences",
    icon: VehicleDashboardIcons.PreferencesIcon,
  },
];

export default function VehicleDashboardScreen() {
  const { vehicleId } = useLocalSearchParams();
  const vehicle = useVehicleStore((state) =>
    state.vehicles.find((v) => v.id === Number(vehicleId))
  );

  if (!vehicle) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center">
        <Text>Loading vehicle...</Text>
      </SafeAreaView>
    );
  }

  const carName =
    vehicle.extraInfo && vehicle.extraInfo.trim().length > 0
      ? vehicle.extraInfo
      : [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      {/* Vehicle Profile Card */}
      <View
        className="w-11/12 bg-white rounded-xl px-6 pt-8 pb-6 items-center mb-4"
        style={{ shadowColor: "#DDD", elevation: 8 }}
      >
        <Image
          source={
            vehicle.vehicleImage
              ? { uri: vehicle.vehicleImage }
              : require("../../../../../assets/rao-app-icon.png")
          }
          className="w-32 h-20 rounded-lg"
        />
        <Text className="text-xl font-bold mt-2">
          {vehicle.year} {vehicle.make} {vehicle.model} • {vehicle.licensePlate}
        </Text>
        <View className="flex-row items-center mt-1 gap-4">
          <Text className="text-md text-yellow-500 font-semibold mr-2">
            ★ {vehicle.rating ?? 0}
          </Text>
          <Text className="text-md text-gray-500">
            {vehicle.trips?.length ?? 0} trips
          </Text>
          <Text className="ml-2 text-md text-gray-600 font-semibold">
            {carName || "Car Name"}
          </Text>
        </View>
      </View>
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
