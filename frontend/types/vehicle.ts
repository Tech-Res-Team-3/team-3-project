import { User } from "./user";
import { Trip } from "./trip";

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
    userId: number;
    user: User;
    trips: Trip[];
}