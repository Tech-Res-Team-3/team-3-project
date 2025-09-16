import firestore from "@react-native-firebase/firestore";
import type { Message } from "../types/message";

const messagesCollection = firestore().collection("messages");

export const createMessage = async (message: any) => {
    console.log("firestoreMessages.createMessage called with:", message);
    const docRef = await messagesCollection.add({
        ...message,
        read: false,
        timestamp: firestore.FieldValue.serverTimestamp(),
    });
    console.log("Firestore write complete");
    return docRef.id;
};

export const updateMessage = async (id: string, updates: any) => {
    console.log(`Updating message ${id} in Firestore with:`, updates);
    await messagesCollection.doc(id).update(updates);
};

export const deleteMessage = async (id: string) => {
    await messagesCollection.doc(id).delete();
};

export const fetchUserMessages = async (toUid: string): Promise<Message[]> => {
    const snapshot = await messagesCollection
        .where("toUid", "==", toUid)
        .orderBy("timestamp", "desc")
        .get();
    const msgs = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log(`Fetched message ${doc.id} from Firestore:`, data);
        return {
            id: doc.id,
            text: data.text ?? "",
            toUid: data.toUid ?? "",
            fromUid: data.fromUid ?? "",
            meta: data.meta ?? {},
            timestamp: data.timestamp,
            read: data.read ?? false,
        } as Message;
    });
    console.log("Returning messages from fetchUserMessages:", msgs);
    return msgs;
};