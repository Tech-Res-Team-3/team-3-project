import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useVehicles } from "../../../../hooks/vehicle/useVehicles";
import { useRouter } from "expo-router";
import { Button } from "../../../../components/Button";
import { useLoadingStore } from "../../../../stores/loadingStore";

const VEHICLE_IMAGE_HEIGHT = 90;
const VEHICLE_IMAGE_WIDTH = 140;
const DEFAULT_IMAGE = require("../../../../assets/default-bmw.jpg");

export default function VehicleSettings() {
  const router = useRouter();
  const { vehicles, fetchUserVehicles } = useVehicles();
  const setLoading = useLoadingStore((s) => s.setLoading);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      try {
        await fetchUserVehicles();
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="py-5">
        {vehicles.length === 0 && (
          <Text className="text-gray-500 mb-4">No vehicles found.</Text>
        )}
        {vehicles.map((vehicle, idx) => (
          <View
            key={vehicle.id}
            className="w-full h-[260] items-center rounded-2xl mb-16"
          >
            <View className="w-11/12 relative">
              {/* Badge */}
              <View className="absolute top-4 left-8 bg-ruby/50 px-5 py-1 rounded-full z-10">
                <Text className="text-lg text-white font-semibold">
                  {idx + 1}/{vehicles.length}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push(`/dashboard/vehicle-dashboard/${vehicle.id}`)
                }
                className="rounded-2xl overflow-hidden w-full"
                activeOpacity={0.85}
              >
                <Image
                  source={
                    vehicle.vehicleImage
                      ? { uri: vehicle.vehicleImage }
                      : DEFAULT_IMAGE
                  }
                  className="w-full h-56 rounded-2xl"
                  resizeMode="cover"
                />
              </TouchableOpacity>
              {/* Overlapping Card */}
              <View className="absolute left-0 right-0 -bottom-28 mx-3 bg-white rounded-xl shadow-xl p-4">
                <Button
                  className="bg-sky-600 py-0.5 px-0.5 w-1/4 mb-4"
                  textClassName="text-white text-sm font-light"
                  title="Listed"
                />
                <Text className="text-xl font-bold text-gray-900">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </Text>
                <View className="border-t border-gray-200 my-2" />
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-700 text-base">
                    ⭐ {vehicle.rating ?? "N/A"}
                  </Text>
                  <Text className="text-gray-700 text-base">
                    {vehicle.trips?.length ?? 0} trips
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="w-full pt-3">
        <Button
          title="Add Vehicle"
          className="bg-ruby py-2 w-11/12 self-center"
          textClassName="text-white"
          onPress={() => router.push("/dashboard/add-vehicle")}
        />
      </View>
    </View>
  );
}

// Only use StyleSheet for props not supported by Tailwind/Nativewind
const styles = StyleSheet.create({
  vehicleImage: {
    width: VEHICLE_IMAGE_WIDTH,
    height: VEHICLE_IMAGE_HEIGHT,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
});
