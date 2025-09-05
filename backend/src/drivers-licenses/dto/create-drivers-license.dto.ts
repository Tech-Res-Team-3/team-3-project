import { IsAlphanumeric, IsString, IsUrl } from 'class-validator';
import { IsValidMMDDYYYYDate } from '../validators/is-valid-mmddyyyy-date.validator';

/** Data Transfer Object for creating a driver's license */
export class CreateDriversLicenseDto {
  /** The driver's license number */
  @IsAlphanumeric()
  licenseNumber: string;

  /** The state that issued the driver's license */
  @IsString()
  issuingState: string;

  /** The expiration date of the driver's license in MM/DD/YYYY format */
  @IsString()
  @IsValidMMDDYYYYDate()
  expirationDate: string;

  /** URL to the front image of the driver's license */
  @IsString()
  @IsUrl()
  frontImage: string;

  /** URL to the back image of the driver's license */
  @IsUrl()
  @IsString()
  backImage: string;
}
