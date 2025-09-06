import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/** Types of seatbelts available in the vehicle */
export enum SeatbeltType {
  SHOULDER = 'SHOULDER',
  LAP = 'LAP',
  BOTH = 'BOTH',
}

/** Condition of the vehicle */
export enum VehicleCondition {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  NOT_WORKING = 'NOT_WORKING',
}

/** Transmission types available in the vehicle */
export enum TransmissionType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
}

/** Data Transfer Object for creating a vehicle */
export class CreateVehicleDto {
  /** The make of the vehicle (e.g., Toyota, Ford) */
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  make: string;

  /** The model of the vehicle (e.g., Camry, F-150) */
  @ApiProperty({ example: 'Camry' })
  @IsString()
  model: string;

  /** The year of the vehicle (e.g., 2020) */
  @ApiProperty({ example: 2020 })
  @IsNumber()
  year: number;

  /** The license plate of the vehicle (e.g., ABC1234) */
  @ApiProperty({ example: 'ABC1234' })
  @IsString()
  licensePlate: string;

  /** The color of the vehicle (e.g., Red, Blue) */
  @ApiProperty({ example: 'Red' })
  @IsString()
  color: string;

  /** The type of the vehicle (e.g., Sedan, SUV) */
  @ApiProperty({ example: 'Sedan' })
  @IsString()
  type: string;

  /** The number of seats in the vehicle (e.g., 5) */
  @ApiPropertyOptional({ example: 5, default: 5 })
  @IsNumber()
  @IsOptional()
  seats?: number;

  /** URL of the vehicle image */
  @ApiPropertyOptional({ example: 'https://example.com/car.png', default: '' })
  @IsString()
  @IsOptional()
  vehicleImage?: string;

  /** Indicates if the vehicle has seatbelts */
  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  hasSeatbelts?: boolean;

  /** The value of the vehicle in USD */
  @ApiProperty({ example: 15000 })
  @IsNumber()
  value: number;

  /** The type of seatbelt in the vehicle */
  @ApiProperty({ enum: SeatbeltType, default: SeatbeltType.BOTH })
  @IsEnum(SeatbeltType, {
    message: 'seatbeltType must be SHOULDER, LAP, OR BOTH',
  })
  seatbeltType?: SeatbeltType;

  /** The condition of the vehicle */
  @ApiProperty({ enum: VehicleCondition })
  @IsEnum(VehicleCondition, {
    message: 'condition must be EXCELLENT, GOOD, FAIR, or NOT_WORKING',
  })
  condition: VehicleCondition;

  /** The Vehicle Identification Number (VIN) */
  @ApiProperty({ example: '1HGCM82633A123456' })
  @IsString()
  vin: string;

  /** The mileage of the vehicle */
  @ApiProperty({ example: 120000 })
  @IsNumber()
  mileage: number;

  /** The transmission type of the vehicle */
  @ApiProperty({ enum: TransmissionType })
  @IsEnum(TransmissionType, {
    message: 'transmission must be AUTOMATIC or MANUAL',
  })
  transmission: TransmissionType;

  /** Indicates if the vehicles sales tax was paid */
  @ApiProperty({ example: true })
  @IsBoolean()
  salesTaxPaid: boolean;

  /** Indicates the vehicles trim */
  @ApiProperty({ example: 'LE' })
  @IsString()
  trim: string;

  /** The body style of the vehicle (e.g., Coupe, Hatchback) */
  @ApiProperty({ example: 'Coupe' })
  @IsString()
  bodyStyle: string;

  /** Indicates if the vehicle has a salvage title */
  @ApiProperty({ example: false })
  @IsBoolean()
  hasSalvageTitle: boolean;

  /** Additional information about the vehicle */
  @ApiProperty({ example: 'Some scratches on the left door' })
  @IsString()
  extraInfo: string;
}
