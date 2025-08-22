import { IsString, IsOptional } from "class-validator";

export class SyncUserDto {
    @IsString()
    @IsOptional()
    role: string;
}

