import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-red-200">
      {/* Custom Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-red-400">
        <Text className="text-xl font-bold text-blue-600">Home</Text>
        <Link href="/profile" asChild>
          <Pressable className="px-3 py-1 bg-blue-600 rounded">
            <Text className="text-white font-semibold">Profile</Text>
          </Pressable>
        </Link>
      </View>
      {/* Main Content */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold text-blue-500">
          Welcome to the App!
        </Text>
      </View>
    </View>
  );
}
