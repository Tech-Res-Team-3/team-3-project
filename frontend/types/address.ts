import { User } from "./user";

export interface Address {
    id: number;
    street: string;
    apartment?: string | null;
    city: string;
    state: string;
    zip: number;
    country: string;
    placeId?: string | null;
    latitude?: number;
    longitude?: number;
    userId: number;
    user?: User;
}