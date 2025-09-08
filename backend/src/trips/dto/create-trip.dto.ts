import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { LatLngDto } from './lat-lng.dto';
import { Type } from 'class-transformer';

/** Enumeration for trip status */
export enum TripStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

/** Data Transfer Object for creating a trip */
export class CreateTripDto {
  /** The starting location of the trip */
  @ApiProperty({
    type: LatLngDto,
    description: 'Starting location coordinates',
  })
  @ValidateNested()
  @Type(() => LatLngDto)
  @IsNotEmpty()
  startLocation: LatLngDto;

  /** The ending location of the trip */
  @ApiProperty({
    type: LatLngDto,
    description: 'Ending location coordinates',
  })
  @ValidateNested()
  @Type(() => LatLngDto)
  @IsNotEmpty()
  endLocation: LatLngDto;

  /** The start date and time of the trip in ISO 8601 format */
  @ApiProperty({ example: '2025-09-05T10:00L00Z' })
  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  /** The end date and time of the trip in ISO 8601 format */
  @ApiProperty({ example: '2025-09-05T11:30L00Z' })
  @IsDateString()
  @IsNotEmpty()
  endAt: string;

  /** The current status of the trip */
  @ApiProperty({ enum: TripStatus, example: TripStatus.SCHEDULED })
  @IsEnum(TripStatus, {
    message: 'Status must be either SCHEDULED, ACTIVE, COMPLETED, or CANCELED',
  })
  status: TripStatus;

  /** The price of the trip */
  @ApiProperty({ example: 25.2 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  /** An optional discount applied to the trip */
  @ApiPropertyOptional({ example: 5 })
  @IsNumber()
  @IsOptional()
  discount?: number;

  /** An optional rating for the trip */
  @ApiPropertyOptional({ example: 4.8 })
  @IsNumber()
  @IsOptional()
  rating?: number;

  /** The ID of the driver associated with the trip */
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;
}
