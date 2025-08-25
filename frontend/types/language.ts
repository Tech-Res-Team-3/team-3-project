import { User } from "./user";

export interface Language {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user?: User;
}