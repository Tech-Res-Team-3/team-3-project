import { Booking } from "./booking";
import { Invoice } from "./invoice";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export type Status = 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELED';

export interface Trip {
    id: number;
    startLocation: string;
    endLocation: string;
    startAt: string;
    endAt: string;
    status: Status;
    price: number;
    discount: number;
    rating: number;
    userId: number;
    user?: User;
    vehicleId: number;
    vehicle?: Vehicle;
    bookings?: Booking[];
    invoices?: Invoice[];
}