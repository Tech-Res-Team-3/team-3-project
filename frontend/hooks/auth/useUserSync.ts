import axios from "../../utils/axios";
import { useAuthStore } from "../../stores/authStore";
import { getAuth } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";

export const useUserSync = () => {
    const setUser = useAuthStore((state) => state.setUser);

    const syncUser = async () => {
        console.log("👤 Starting user sync...");

        // Check if user is authenticated before making the request
        const app = getApp();
        const auth = getAuth(app);
        const currentUser = auth.currentUser;

        console.log("👤 Current user exists:", !!currentUser);
        console.log("👤 Current user uid:", currentUser?.uid);
        console.log("👤 Current user email:", currentUser?.email);

        if (!currentUser) {
            console.log("❌ No authenticated user found");
            throw new Error("No authenticated user found");
        }

        // Parse name fields from displayName if available
        let firstName = "";
        let lastName = "";
        if (currentUser.displayName) {
            const [first, ...rest] = currentUser.displayName.split(" ");
            firstName = first;
            lastName = rest.join(" ");
        }

        const payload = {
            email: currentUser.email,
            firstName: firstName || "Unknown", // fallback if not present
            lastName: lastName || "",
            firebaseUid: currentUser.uid,
            // add any other required fields here
        };

        console.log("👤 Making sync request to /users/sync with payload:", payload);
        const res = await axios.post("/users/sync", payload);
        console.log("👤 Sync response:", res.data);

        if (res.data.user) {
            console.log("👤 Setting user in store:", res.data.user);
            setUser(res.data.user);
        }
        return res.data.user;
    };

    return { syncUser };
};