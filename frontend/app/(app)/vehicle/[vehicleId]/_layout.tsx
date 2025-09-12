import { Stack, useRouter, useSegments, Slot, usePathname } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import * as GeneralIcons from "../../../../components/icons/GeneralIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


export default function VehicleBookingLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-gray-100 border-b border-gray-200">
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
              Book Rental
            </Text>
          </View>
          {/* Empty view for symmetry */}
          <View className="w-10 h-10" />
        </View>
      </View>

      {/* Screen Content */}
      <View className="flex-1">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
