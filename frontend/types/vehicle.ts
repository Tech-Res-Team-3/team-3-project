import { User } from "./user";
import { Trip } from "./trip";
import { Address } from "./address";

export type Transmission = 'AUTOMATIC' | 'MANUAL';

export type Condition = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'NOT WORKING';

export type SeatbeltType = 'SHOULDER' | 'LAP' | 'BOTH';

export interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    color: string;
    seats: number;
    type: string;
    vehicleImage: string;
    verified: boolean;
    rating: number;
    hasSeatbelts: boolean;
    seatbeltType: SeatbeltType;
    condition: Condition;
    value: number;
    vin: string;
    mileage: number;
    transmission: Transmission;
    salesTaxPaid: boolean;
    trim: string;
    bodyStyle: string;
    hasSalvageTitle: boolean;
    extraInfo?: string;
    userId: number;
    user: User;
    trips: Trip[];
    address: Address;
}