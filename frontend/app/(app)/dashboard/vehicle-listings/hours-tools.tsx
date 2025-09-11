import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import * as VDashboardIcons from "./../../../../components/icons/dashboard/vehicle/VehicleDashboardIcons";

const DEFAULT_IMAGE = require("../../../../assets/default-bmw.jpg");

export default function HoursToolsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center pt-8">
      {/* Menu Items */}
      <View className="w-11/12">
        {/* Pickup & Return Hours */}
        <TouchableOpacity
          className="flex-row items-center bg-white w-full rounded-xl px-6 py-5 mb-4"
          style={{
            shadowColor: "#DDD",
            elevation: 8,
          }}
          activeOpacity={0.7}
          onPress={() => {
            // Add navigation or logic here
          }}
        >
          <View className="mr-4">
            <VDashboardIcons.ClockAltIcon size={26} color="#c41111" />
          </View>
          <Text className="text-lg font-semibold text-gray-800">
            Pickup & Return Hours
          </Text>
        </TouchableOpacity>

        {/* Owner Tools */}
        <TouchableOpacity
          className="flex-row items-center bg-white w-full rounded-xl px-6 py-5"
          style={{
            shadowColor: "#DDD",
            elevation: 8,
          }}
          activeOpacity={0.7}
          onPress={() => {
            // Add navigation or logic here
          }}
        >
          <View className="mr-4">
            <VDashboardIcons.ToolsIcon size={26} color="#c41111" />
          </View>
          <Text className="text-lg font-semibold text-gray-800">
            Owner Tools
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
