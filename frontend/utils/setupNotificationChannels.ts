import notifee, { AndroidImportance } from '@notifee/react-native';

export async function setupNotificationChannels() {
    // Default channel (used for most notifications)
    await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.DEFAULT,
    });

    // Example: High-importance channel for alerts/messages
    await notifee.createChannel({
        id: 'alerts',
        name: 'Alerts',
        importance: AndroidImportance.HIGH,
    });

    // Add more channels as needed
}