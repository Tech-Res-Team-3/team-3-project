import { Trip } from "./trip";
import { User } from "./user";

export interface Invoice {
    id: number;
    basePrice: number;
    discount: number;
    extrasTotal: number;
    tax: number;
    feesTotal: number;
    milageFee: number;
    lateFee: number;
    totalPrice: number;
    userId: number;
    user?: User;
    tripId: number;
    trip?: Trip;
}