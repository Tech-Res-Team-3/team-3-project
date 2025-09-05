import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/** Types of seatbelts available in the vehicle */
export enum seatbeltType {
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
  @IsString()
  make: string;

  /** The model of the vehicle (e.g., Camry, F-150) */
  @IsString()
  model: string;

  /** The year of the vehicle (e.g., 2020) */
  @IsNumber()
  year: number;

  /** The license plate of the vehicle (e.g., ABC1234) */
  @IsString()
  licensePlate: string;

  /** The color of the vehicle (e.g., Red, Blue) */
  @IsString()
  color: string;

  /** The type of the vehicle (e.g., Sedan, SUV) */
  @IsString()
  type: string;

  /** The number of seats in the vehicle (e.g., 5) */
  @IsNumber()
  @IsOptional()
  seats?: number;

  /** URL of the vehicle image */
  @IsString()
  @IsOptional()
  vehicleImage?: string;

  /** Indicates if the vehicle has seatbelts */
  @IsBoolean()
  @IsOptional()
  hasSeatbelts?: boolean;

  /** The value of the vehicle in USD */
  @IsNumber()
  value: number;

  /** The type of seatbelt in the vehicle */
  @IsEnum(seatbeltType, {
    message: 'seatbeltType must be SHOULDER, LAP, OR BOTH',
  })
  seatbeltType: seatbeltType;

  /** The condition of the vehicle */
  @IsEnum(VehicleCondition, {
    message: 'condition must be EXCELLENT, GOOD, FAIR, or NOT_WORKING',
  })
  condition: VehicleCondition;

  /** The Vehicle Identification Number (VIN) */
  @IsString()
  vin: string;

  /** The mileage of the vehicle */
  @IsNumber()
  mileage: number;

  /** The transmission type of the vehicle */
  @IsEnum(TransmissionType, {
    message: 'transmission must be AUTOMATIC or MANUAL',
  })
  transmission: TransmissionType;

  /** Indicates if the vehicle has air conditioning */
  @IsBoolean()
  salesTaxPaid: boolean;

  /** Indicates if the vehicle has air conditioning */
  @IsString()
  trim: string;

  /** The body style of the vehicle (e.g., Coupe, Hatchback) */
  @IsString()
  bodyStyle: string;

  /** Indicates if the vehicle has a salvage title */
  @IsBoolean()
  hasSalvageTitle: boolean;

  /** Additional information about the vehicle */
  @IsString()
  extraInfo: string;
}
