import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthStore } from "../../stores/authStore";
import { useMessageStore } from "../../stores/messageStore";

export function useFetchMessages() {
    const user = useAuthStore((s) => s.user);
    const setMessages = useMessageStore((s) => s.setMessages);

    useEffect(() => {
        if (!user) return;
        const unsubscribe = firestore()
            .collection("messages")
            .where("toUid", "==", user.firebaseUid)
            .orderBy("timestamp", "desc")
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot) {
                    setMessages([]); // Clear messages if denied or error
                    return;
                }
                const msgs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMessages(msgs);
            }, (error) => {
                // Optional: log or handle permission errors
                console.error("Firestore onSnapshot error:", error);
                setMessages([]);
            });
        return unsubscribe;
    }, [user, setMessages]);
}