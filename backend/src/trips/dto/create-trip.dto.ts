import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  startLocation: string;

  /** The ending location of the trip */
  @IsString()
  @IsNotEmpty()
  endLocation: string;

  /** The start date and time of the trip in ISO 8601 format */
  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  /** The end date and time of the trip in ISO 8601 format */
  @IsDateString()
  @IsNotEmpty()
  endAt: string;

  /** The current status of the trip */
  @IsEnum(TripStatus, {
    message: 'Status must be either SCHEDULED, ACTIVE, COMPLETED, or CANCELED',
  })
  status: TripStatus;

  /** The price of the trip */
  @IsNumber()
  @IsNotEmpty()
  price: number;

  /** An optional discount applied to the trip */
  @IsNumber()
  @IsOptional()
  discount?: number;

  /** An optional rating for the trip */
  @IsNumber()
  @IsOptional()
  rating?: number;

  /** The ID of the driver associated with the trip */
  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;
}
