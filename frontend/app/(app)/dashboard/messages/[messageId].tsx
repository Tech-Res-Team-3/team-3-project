import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useMessageStore } from "../../../../stores/messageStore";

export default function MessageDetailScreen() {
  const { messageId } = useLocalSearchParams();
  const message = useMessageStore((s) =>
    s.messages.find((m) => m.id === messageId)
  );

  if (!message) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base text-gray-700">Message not found.</Text>
      </View>
    );
  }

  const isBooking = message.meta?.tripId;

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">
        {isBooking
          ? `Trip booked by ${message.meta?.bookedBy || "Guest"}`
          : "Message"}
      </Text>
      {isBooking ? (
        <View>
          <Text className="mb-4 font-semibold">{message?.text}</Text>
          <Text className="font-bold mb-1">Trip Details:</Text>
          <Text className="mb-1">Trip ID: {message?.meta?.tripId}</Text>
          <Text className="mb-1">Booked By: {message?.meta?.bookedBy}</Text>
          <Text className="mb-1">From: {message?.meta?.from}</Text>
          <Text className="mb-1">To: {message?.meta?.to}</Text>
          <Text className="mb-1">Total: ${message?.meta?.bookingPrice}</Text>
        </View>
      ) : (
        <Text className="text-base">{message.text}</Text>
      )}
    </View>
  );
}
