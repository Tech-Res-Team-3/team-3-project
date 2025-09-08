import { IsAlphanumeric, IsString, IsUrl } from 'class-validator';
import { IsValidMMDDYYYYDate } from '../validators/is-valid-mmddyyyy-date.validator';
import { ApiProperty } from '@nestjs/swagger';

/** Data Transfer Object for creating a driver's license */
export class CreateDriversLicenseDto {
  /** The driver's license number */
  @ApiProperty({
    example: 'D12345567',
    description: 'the unique number on the drivers license',
  })
  @IsAlphanumeric()
  licenseNumber: string;

  /** The state that issued the driver's license */
  @ApiProperty({
    example: 'FL',
    description: 'Two-letter abbreviation of the issuing state',
  })
  @IsString()
  issuingState: string;

  /** The expiration date of the driver's license in MM/DD/YYYY format */
  @ApiProperty({
    example: '12/31/2025',
    description: 'Expiration date in MM/DD/YYY format',
  })
  @IsString()
  @IsValidMMDDYYYYDate()
  expirationDate: string;

  /** URL to the front image of the driver's license */
  @ApiProperty({
    example: 'https://example.com/front.jpg',
    description: 'Front image of the license',
  })
  @IsString()
  @IsUrl()
  frontImage: string;

  /** URL to the back image of the driver's license */
  @ApiProperty({
    example: 'https://example.com/back.jpg',
    description: 'Back image of the license',
  })
  @IsUrl()
  @IsString()
  backImage: string;
}
