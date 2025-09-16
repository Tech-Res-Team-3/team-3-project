import { useRouter, Slot } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessagesLayout() {
  const router = useRouter();

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
          {/* Centered Title */}
          <View className="absolute left-0 right-0 items-center">
            <Text className="text-3xl font-bold text-gray-900">
              Messages
            </Text>
          </View>
          <View className="w-10 h-10" />
        </View>
      </View>
      <View className="flex-1">
        <Slot />
      </View>
    </SafeAreaView>
  );
}