import { useEffect } from "react";
import { requestNotificationPermission } from "../../utils/requestNotificationPermission";

export function useNotificationPermission() {
    useEffect(() => {
        requestNotificationPermission();
    }, []);
}