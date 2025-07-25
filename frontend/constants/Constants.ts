export const Colors = {
    primary: '#007AFF', secondary: '#34C759', danger: '#FF3B30', warning: '#FF9500', background: '#F2F2F7', surface: '#FFFFFF', text: {
        primary: '#000000', secondary: '#6D6D80', tertiary: '#8E8E93',
    }, border: '#C6C6C8',
} as const;

export const Spacing = {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
} as const;

export const Typography = {
    title: {
        fontSize: 28, fontWeight: 'bold' as const,
    }, heading: {
        fontSize: 22, fontWeight: '600' as const,
    }, body: {
        fontSize: 16, fontWeight: 'normal' as const,
    }, caption: {
        fontSize: 14, fontWeight: 'normal' as const,
    },
} as const;