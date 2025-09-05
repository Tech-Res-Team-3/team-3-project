import { IntersectionType } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/** DTO for creating an address */
export class CreateAddressDto {
  /** Street address */
  @IsString()
  @MaxLength(255)
  street: string;

  /** City name */
  @IsString()
  @MaxLength(100)
  city: string;

  /** State name */
  @IsString()
  @MaxLength(100)
  state: string;

  /** Country name */
  @IsString()
  @MinLength(2)
  country: string;

  /** ZIP code */
  @IsNumber()
  @Type(() => Number)
  zip: number;

  /** Latitude coordinate */
  @IsOptional()
  @IsNumber()
  latitude: number;

  /** Longitude coordinate */
  @IsOptional()
  @IsNumber()
  longitude: number;
}
