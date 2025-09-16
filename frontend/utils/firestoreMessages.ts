import firestore from "@react-native-firebase/firestore";

const messagesCollection = firestore().collection("messages");

export const createMessage = async (message: any) => {
    console.log("firestoreMessages.createMessage called with:", message);
    const docRef = await messagesCollection.add({
        ...message,
        timestamp: firestore.FieldValue.serverTimestamp(),
    });
    console.log("Firestore write complete");
    return docRef.id;
};

export const updateMessage = async (id: string, updates: any) => {
    await messagesCollection.doc(id).update(updates);
};

export const deleteMessage = async (id: string) => {
    await messagesCollection.doc(id).delete();
};

export const fetchUserMessages = async (toUid: string) => {
    const snapshot = await messagesCollection
        .where("toUid", "==", toUid)
        .orderBy("timestamp", "desc")
        .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};