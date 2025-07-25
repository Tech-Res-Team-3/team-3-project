import { Platform, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Constants';
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.background,
    }, card: {
        backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, marginBottom: Spacing.md, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
    }, row: {
        flexDirection: 'row', alignItems: 'center',
    }, spaceBetween: {
        justifyContent: 'space-between',
    }, centerContent: {
        justifyContent: 'center', alignItems: 'center',
    },
});

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 50 : 25, ...Platform.select({
            ios: {
                shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4,
            }, android: {
                elevation: 5,
            },
        }),
    },
});