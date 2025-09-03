import { useEffect } from 'react';
import { setupNotificationChannels } from '../../utils/setupNotificationChannels';

export function useSetupNotificationChannels() {
    useEffect(() => {
        setupNotificationChannels();
    }, []);
}