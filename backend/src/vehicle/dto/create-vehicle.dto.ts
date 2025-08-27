import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum seatbeltType {
  SHOULDER = 'SHOULDER',
  LAP = 'LAP',
  BOTH = 'BOTH',
}

export enum VehicleCondition {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  NOT_WORKING = 'NOT_WORKING',
}

export enum TransmissionType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
}

export class CreateVehicleDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsString()
  licensePlate: string;

  @IsString()
  color: string;

  @IsString()
  type: string;

  @IsNumber()
  @IsOptional()
  seats?: number;

  @IsString()
  @IsOptional()
  vehicleImage?: string;

  @IsBoolean()
  @IsOptional()
  hasSeatbelts?: boolean;

  @IsNumber()
  value: number;

  @IsEnum(seatbeltType, {
    message: 'seatbeltType must be SHOULDER, LAP, OR BOTH',
  })
  seatbeltType: seatbeltType;

  @IsEnum(VehicleCondition, {
    message: 'condition must be EXCELLENT, GOOD, FAIR, or NOT_WORKING',
  })
  condition: VehicleCondition;

  @IsString()
  vin: string;

  @IsNumber()
  mileage: number;

  @IsEnum(TransmissionType, {
    message: 'transmission must be AUTOMATIC or MANUAL',
  })
  transmission: TransmissionType;

  @IsBoolean()
  salesTaxPaid: boolean;

  @IsString()
  trim: string;

  @IsString()
  bodyStyle: string;

  @IsBoolean()
  hasSalvageTitle: boolean;

  @IsString()
  extraInfo: string;
}
