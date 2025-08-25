import { Language } from "./language";
import { Vehicle } from "./vehicle";
import { Trip } from "./trip";
import { DriverLicense } from "./driverLicense";
import { Address } from "./address";
import { Booking } from "./booking";
import { Invoice } from "./invoice";

export type Role = 'GUEST' | 'HOST' | 'ADMIN';

export interface User {
    id: number;
    firebaseUid: string;
    email: string;
    firstName: string;
    lastName?: string | null;
    phone?: string | null;
    photoUrl?: string | null;
    role: Role;
    createdAt?: string;
    updatedAt?: string;
    verifiedDriver?: boolean;
    rating?: number;
    tripsCompleted?: number;
    stripeAccountId?: string | null;
    profileComplete?: boolean;
    addresses?: Address[];
    driverLicenses?: DriverLicense[];
    languages?: Language[];
    vehicles?: Vehicle[];
    trips?: Trip[];
    bookings?: Booking[];
    invoices?: Invoice[];
}