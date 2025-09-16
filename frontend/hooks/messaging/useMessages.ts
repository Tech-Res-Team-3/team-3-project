import { useAuthStore } from "../../stores/authStore";
import { useMessageStore } from "../../stores/messageStore";
import * as firestoreMessages from "../../utils/firestoreMessages";
import { useCallback } from "react";

export function useMessages() {
    const user = useAuthStore((s) => s.user);
    const setMessages = useMessageStore((s) => s.setMessages);
    const addMessageToStore = useMessageStore((s) => s.addMessage);

    // Fetch messages for the current user
    const fetchMessages = useCallback(async () => {
        if (!user) return;
        const msgs = await firestoreMessages.fetchUserMessages(user.firebaseUid);
        setMessages(msgs);
    }, [user, setMessages]);

    // Create a new message
    const createMessage = useCallback(
        async (msg: any) => {
            if (!user) {
                console.log("No user, cannot send message");
                return;
            }
            try {
                console.log("Sending message:", { ...msg, fromUid: user.firebaseUid });
                const id = await firestoreMessages.createMessage({
                    ...msg,
                    fromUid: user.firebaseUid,
                });
                console.log("Message sent, Firestore ID:", id);
            } catch (err) {
                console.error("Error sending message:", err);
            }
        },
        [user]
    );

    // Update a message
    const updateMessage = useCallback(
        async (id: string, updates: any) => {
            await firestoreMessages.updateMessage(id, updates);
            useMessageStore.getState().setMessages(
                useMessageStore.getState().messages.map((msg) =>
                    msg.id === id ? { ...msg, ...updates } : msg
                )
            );
            console.log(`Updated message ${id} in local store with:`, updates);
            fetchMessages();
        },
        [fetchMessages]
    );

    // Delete a message
    const deleteMessage = useCallback(
        async (id: string) => {
            await firestoreMessages.deleteMessage(id);
            fetchMessages();
        },
        [fetchMessages]
    );

    return {
        fetchMessages,
        createMessage,
        updateMessage,
        deleteMessage,
    };
}