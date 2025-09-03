import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { useMessageStore } from "../../stores/messageStore";

export function useFCMListener() {
    const addMessage = useMessageStore((s) => s.addMessage);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            addMessage(remoteMessage);
        });
        return unsubscribe;
    }, [addMessage]);
}