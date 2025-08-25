import { User } from "./user";

export interface DriverLicense {
    id: number;
    licenseNumber: string;
    state: string;
    expiration: string;
    frontImage: string;
    backImage: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
    userId?: string;
    user?: User;
}