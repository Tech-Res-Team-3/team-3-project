import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useMessageStore } from "../../stores/messageStore";

export function useFCMListener() {
    const addMessage = useMessageStore((s) => s.addMessage);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            addMessage(remoteMessage);

            // If a custom notifee payload is present, use it
            if (remoteMessage.data?.notifee) {
                const notifeePayload = typeof remoteMessage.data.notifee === "string"
                    ? JSON.parse(remoteMessage.data.notifee)
                    : remoteMessage.data.notifee;
                await notifee.displayNotification(notifeePayload);
                return;
            }

            // Otherwise, fallback to your default notification logic
            await notifee.displayNotification({
                title: remoteMessage.notification?.title || "New Message",
                body: remoteMessage.notification?.body || (typeof remoteMessage.data?.text === "string" ? remoteMessage.data.text : JSON.stringify(remoteMessage.data?.text)) || "",
                android: {
                    channelId: "default",
                    importance: AndroidImportance.HIGH,
                },
            });
        });

        // Create a default channel (Android)
        notifee.createChannel({
            id: "default",
            name: "Default Channel",
            importance: AndroidImportance.HIGH,
        });

        return unsubscribe;
    }, [addMessage]);
}