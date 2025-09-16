import React from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useMessageStore } from "../../../../stores/messageStore";
import { useMessages } from "../../../../hooks/messaging/useMessages";
import { useFetchMessages } from "../../../../hooks/messaging/useFetchMessages";
import type { Message } from "../../../../types/message";

export default function MessagesScreen() {
  useFetchMessages();
  const messages = useMessageStore((s) => s.messages);
  const { updateMessage } = useMessages();
  const router = useRouter();

  const renderMessage: ListRenderItem<Message> = ({ item }) => {
    console.log(`Rendering message ${item.id}: read =`, item.read);
    const isBooking = item.meta?.tripId;
    return (
      <TouchableOpacity
        onPress={async () => {
          console.log(`Pressed message ${item.id}: read =`, item.read);
          if (!item.read) {
            useMessageStore
              .getState()
              .setMessages(
                messages.map((msg) =>
                  msg.id === item.id ? { ...msg, read: true } : msg
                )
              );
            console.log(`Set message ${item.id} as read in local store`);
            try {
              await updateMessage(item.id, { read: true });
              console.log(
                `Successfully updated message ${item.id} in Firestore`
              );
            } catch (err) {
              console.error(
                `Failed to update message ${item.id} in Firestore:`,
                err
              );
            }
          }
          router.push(`/dashboard/messages/${item.id}`);
        }}
        className="mb-3 p-4 bg-white rounded-lg border border-gray-200"
      >
        <Text
          className={`${!item.read ? "font-extrabold" : "font-normal"} text-base`}
        >
          {isBooking
            ? `Trip booked by ${item.meta?.bookedBy || "Guest"}`
            : item.text}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          {item.timestamp
            ? typeof item.timestamp === "object" &&
              typeof (item.timestamp as any).toDate === "function"
              ? (item.timestamp as any).toDate().toLocaleString()
              : item.timestamp instanceof Date
                ? item.timestamp.toLocaleString()
                : ""
            : ""}
        </Text>
        {!isBooking && <Text className="mt-2 text-gray-700">{item.text}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={messages as Message[]}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-8">
            No messages yet.
          </Text>
        }
      />
    </View>
  );
}
