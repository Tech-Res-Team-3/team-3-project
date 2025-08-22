import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class PatchUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    firstName: string;
    
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastName: string;
    
    @IsString()
    @IsNotEmpty()
    phone?: string;
}