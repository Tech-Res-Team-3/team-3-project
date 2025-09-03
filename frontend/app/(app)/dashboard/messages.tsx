import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Button } from "react-native";
import { useMessageStore } from "../../../stores/messageStore";
import { useMessages } from "../../../hooks/messaging/useMessages";
import { useFetchMessages } from "../../../hooks/messaging/useFetchMessages";

export default function MessagesScreen() {
  useFetchMessages();
  const messages = useMessageStore((s) => s.messages);
  const { fetchMessages, createMessage, updateMessage, deleteMessage } =
    useMessages();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Messages
      </Text>
      <Button
        title="Send Test Message"
        onPress={() =>
          createMessage({
            toUid: "someOtherUserFirebaseUid",
            text: "Hello from test!",
          })
        }
      />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 12,
              padding: 12,
              backgroundColor: "#f3f3f3",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.text}</Text>
            <Text style={{ fontSize: 10, color: "#888" }}>
              {item.timestamp?.toDate
                ? item.timestamp.toDate().toLocaleString()
                : ""}
            </Text>
            <Button title="Delete" onPress={() => deleteMessage(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
