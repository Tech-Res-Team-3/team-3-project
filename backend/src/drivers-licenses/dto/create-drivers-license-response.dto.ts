import { ApiProperty } from '@nestjs/swagger';

export class CreateDriversLicenseResponseDto {
  /** Unique identifier of the driver's license record */
  @ApiProperty({ example: 1 })
  id: number;

  /** Unique number for the driver license */
  @ApiProperty({ example: 'D12345567' })
  licenseNumber: string;

  /** Two character string of the state the driver license was issued */
  @ApiProperty({ example: 'FL' })
  issuingState: string;

  /** Date that the driver license expires */
  @ApiProperty({ example: '12/31/2025' })
  expirationDate: string;

  /** Url that takes you to the place the front image of the driver license is stored */
  @ApiProperty({ example: 'https://example.com/front.jpg' })
  frontImage: string;

  /** Url that takes you to the place the back image of the driver license is stored */
  @ApiProperty({ example: 'https://example.com/back.jpg' })
  backImage: string;

  /** A boolean value to indicate whether a driver is verified by the admins or not */
  @ApiProperty({ example: false })
  isVerified: boolean;

  /** The id of the user that the driver license belongs to */
  @ApiProperty({ example: 1 })
  userId: number;

  /** The date and time the driver license object was created */
  @ApiProperty({ example: '2025-09-05T10:05:00Z' })
  createdAt: string;

  /** The date and time the driver license object was updated */
  @ApiProperty({ example: '2025-09-05T10:05:00Z' })
  updatedAt: string;
}
