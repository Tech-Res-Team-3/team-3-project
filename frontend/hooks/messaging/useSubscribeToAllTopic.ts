import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";

export function useSubscribeToAllTopic() {
    useEffect(() => {
        messaging().subscribeToTopic("all").then(() => {
            console.log("Subscibed to topic: all");
        });
        return () => {
            messaging().unsubscribeFromTopic("all");
        };
    }, []);
}