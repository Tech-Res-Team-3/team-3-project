import { Type } from "class-transformer";
import { IsAlphanumeric, IsBoolean, IsDate, IsDateString, IsString } from "class-validator";


export class CreateDriversLicenseDto {

    @IsAlphanumeric()
    licenseNumber: string;
    
    @IsString()
    issuingState: string;
    
    @IsDateString()
    expirationDate: Date;
    
    @IsBoolean()
    isVerified: boolean;
    
    @IsDate()
    createdAt?: Date;
    
    @IsDate()
    updatedAt?: Date;
    
    @Type(() => Number)
    userId: string;
}