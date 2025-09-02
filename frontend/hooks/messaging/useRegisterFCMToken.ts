import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import { useAuthStore } from "../../stores/authStore";

export function useRegisterFCMToken() {
    const user = useAuthStore((s) => s.user);

    useEffect(() => {
        if (!user) return;

        // Get the FCM token and save it to Firestore
        messaging()
            .getToken()
            .then(async (token) => {
                if (!token) return;
                // grab FCM token for testing
                console.log("FCM Token for this device:", token);
                // Save/update the token under the user's document in Firestore
                await firestore()
                    .collection("users")
                    .doc(user.firebaseUid)
                    .set({ fcmToken: token }, { merge: true });
            });

        // Listen for token refresh and update Firestore
        const unsubscribe = messaging().onTokenRefresh(async (token) => {
            await firestore()
                .collection("users")
                .doc(user.firebaseUid)
                .set({ fcmToken: token }, { merge: true });
        });

        return unsubscribe;
    }, [user]);
}