import { IsAlphanumeric, IsBoolean, IsDate, IsDateString, IsOptional, IsString, IsUrl, Matches } from "class-validator";
import { IsValidMMDDYYYYDate } from "../validators/is-valid-mmddyyyy-date.validator";


export class CreateDriversLicenseDto {

    @IsAlphanumeric()
    licenseNumber: string;
    
    @IsString()
    issuingState: string;
    
    @IsString()
    @IsValidMMDDYYYYDate()
    expirationDate: string;
    
    @IsString()
    @IsUrl()
    frontImage: string;
    
    @IsUrl()
    @IsString()
    backImage: string;
}