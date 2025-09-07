import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Dto representing an address */
export class AddressResponseDto {
  /** Unique identifier of the address */
  @ApiProperty({ example: 1 })
  id: number;

  /** Street address */
  @ApiProperty({ example: '222 22nd St. S' })
  street: string;

  /** Optional apartment or unit number */
  @ApiPropertyOptional({ example: '' })
  apartment?: string;

  /** City name */
  @ApiProperty({ example: 'Saint Petersburg' })
  city: string;

  /** State or province */
  @ApiProperty({ example: 'USA' })
  state: string;

  /** ZIP or postal code */
  @ApiProperty({ example: 33712 })
  zip: number;

  /** Country */
  @ApiProperty({ example: 'USA' })
  country: string;

  /** Optional unique place ID (e.g., from Google Places) */
  @ApiPropertyOptional({ example: 'ChIJ7aVxnOTHwoARxKIntFtakKo' })
  placeId?: string;

  /** Latitude coordinate */
  @ApiProperty({ example: 27.7755 })
  latitude: number;

  /** Longitude coordinate */
  @ApiProperty({ example: 82.6188 })
  longitude: number;

  /** Indicates if the addres is currently active */
  @ApiProperty({ example: true })
  isActive: boolean;

  /** Optional ID of the user associated with the address */
  @ApiPropertyOptional({ example: 1 })
  userId?: number;
}
