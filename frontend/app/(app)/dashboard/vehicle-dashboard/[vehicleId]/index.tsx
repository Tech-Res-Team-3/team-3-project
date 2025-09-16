import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as VehicleDashboardIcons from "../../../../../components/icons/dashboard/vehicle/VehicleDashboardIcons";
import { useVehicleStore } from "../../../../../stores/vehicleStore";
import { Button } from "../../../../../components/Button";
import { Ionicons } from "@expo/vector-icons";

export default function VehicleDashboardScreen() {
  const router = useRouter();
  const { vehicleId } = useLocalSearchParams();
  const vehicle = useVehicleStore((state) =>
    state.vehicles.find((v) => v.id === Number(vehicleId))
  );
  const menuItems = [
    {
      label: "Calendar",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/calendar`,
      icon: VehicleDashboardIcons.CalendarIcon,
    },
    {
      label: "Pricing & Discounts",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/prices`,
      icon: VehicleDashboardIcons.PricesIcon,
    },
    {
      label: "Location & Delivery",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/location`,
      icon: VehicleDashboardIcons.LocationIcon,
    },
    {
      label: "Guest Instructions",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/instructions`,
      icon: VehicleDashboardIcons.InstructionsIcon,
    },
    {
      label: "Photos",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/photos`,
      icon: VehicleDashboardIcons.PhotosIcon,
    },
    {
      label: "Details",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/details`,
      icon: VehicleDashboardIcons.DetailsIcon,
    },
    {
      label: "Pickup & Return Hours",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/hours`,
      icon: VehicleDashboardIcons.ClockAltIcon,
    },
    {
      label: "Extras",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/extras`,
      icon: VehicleDashboardIcons.ExtrasIcon,
    },
    {
      label: "Distance Included",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/distance`,
      icon: VehicleDashboardIcons.DistanceIcon,
    },
    {
      label: "Goals",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/goals`,
      icon: VehicleDashboardIcons.GoalsIcon,
    },
    {
      label: "Trip Preferences",
      route: `/dashboard/vehicle-dashboard/${vehicleId}/preferences`,
      icon: VehicleDashboardIcons.PreferencesIcon,
    },
  ];

  if (!vehicle) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center">
        <Text>Loading vehicle...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      <View className="w-full bg-gray-100 border-b border-gray-200">
        <View className="flex-row items-center justify-between px-4 pt-4 pb-3 relative">
          {/* Back Arrow */}
          <TouchableOpacity
            onPress={() => router.replace("/dashboard/vehicle-listings")}
            hitSlop={12}
            className="w-10 h-10 justify-center items-start"
          >
            <Ionicons name="arrow-back" size={32} color="#c41111" />
          </TouchableOpacity>
          {/* Centered Title */}
          <View className="absolute left-0 right-0 items-center">
            <Text className="text-2xl font-bold text-gray-900">
              Vehicle Dashboard
            </Text>
          </View>
          <View className="w-10 h-10" />
        </View>
      </View>
      {/* Vehicle Profile Card */}
      <View
        className="w-11/12 bg-white rounded-xl items-center mb-2 pb-2"
        style={{ shadowColor: "#DDD", elevation: 8 }}
      >
        <Image
          source={
            vehicle.vehicleImage
              ? { uri: vehicle.vehicleImage }
              : require("../../../../../assets/default-bmw.jpg")
          }
          className="w-full h-56 rounded-lg"
        />
        <View className="flex-col w-11/12 mt-4 mb-4">
          {/* TODO: Vehicle - add snooze prop */}
          <Button
            className="bg-sky-600 w-1/4 py-[6px] mb-2"
            title="Snoozed"
            textClassName="text-sm text-white"
          />
          <Text className="self-start text-left text-xl font-bold mt-2">
            {vehicle.year} {vehicle.make} {vehicle.model} •{" "}
            <Text className="font-normal text-gray-500">
              {vehicle.licensePlate}
            </Text>
          </Text>
          <View className="flex-row items-center mt-1 gap-4">
            <Text className="text-lg text-yellow-500 font-semibold mr-2">
              ★ {vehicle.rating ?? 0}
            </Text>
            <Text className="text-lg text-gray-500">
              {vehicle.trips?.length ?? 0} trips
            </Text>
            <Text className="ml-2 text-lg text-gray-500 font-semibold">
              Car Name
            </Text>
          </View>
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
