import { Trip } from "./trip";
import { User } from "./user";

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'DECLINED';

export interface Booking {
    id: number;
    bookedAt: string;
    stripeId?: string;
    status: BookingStatus;
    userId: number;
    user?: User;
    tripId: number;
    trip?: Trip;
}