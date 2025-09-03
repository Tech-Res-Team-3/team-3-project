import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";
import { useMessageStore } from "../../stores/messageStore";

export function useFCMListener() {
    const addMessage = useMessageStore((s) => s.addMessage);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            addMessage(remoteMessage);

            // Choose channel based on message data or type
            const rawChannelId = remoteMessage.data?.channelId;
            const channelId =
                typeof rawChannelId === "string"
                    ? rawChannelId
                    : remoteMessage.data?.type === "alert"
                        ? "alerts"
                        : "default";

            await notifee.displayNotification({
                title: remoteMessage.notification?.title ?? "New Message",
                body: remoteMessage.notification?.body ?? "",
                android: {
                    channelId,
                },
            });
        });
        return unsubscribe;
    }, [addMessage]);
}