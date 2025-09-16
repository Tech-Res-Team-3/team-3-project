export interface Message {
    id: string;
    text: string;
    toUid: string;
    fromUid: string;
    meta?: {
        tripId?: string | number;
        bookingPrice?: number;
        from?: string;
        to?: string;
        bookedBy?: string;
        [key: string]: any;
    };
    timestamp?: {
        toDate?: () => Date;
        seconds?: number;
        nanoseconds?: number;
    } | Date;
    read?: boolean;
}