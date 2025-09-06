import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** DTO for creating an address */
export class CreateAddressDto {
  /** Street address */
  @ApiProperty({
    example: '222 22nd St. S',
    description: 'The street and house number of the address',
  })
  @IsString()
  @MaxLength(255)
  street: string;

  /** City name */
  @ApiProperty({
    example: 'Saint Petersburg',
    description: 'The city of the address',
  })
  @IsString()
  @MaxLength(100)
  city: string;

  /** State name */
  @ApiProperty({ example: 'Florida', description: 'The state of the address' })
  @IsString()
  @MaxLength(100)
  state: string;

  /** Country name */
  @ApiProperty({ example: 'USA', description: 'The country of the address' })
  @IsString()
  @MinLength(2)
  country: string;

  /** ZIP code */
  @ApiProperty({ example: 33712, description: 'The zip code of the address' })
  @IsNumber()
  @Type(() => Number)
  zip: number;

  /** Latitude coordinate */
  @ApiPropertyOptional({
    example: 27.7755,
    description: 'The latitude of the address',
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  /** Longitude coordinate */
  @ApiPropertyOptional({
    example: 82.6188,
    description: 'The longitude of the address',
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
