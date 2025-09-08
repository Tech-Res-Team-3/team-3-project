import { ApiProperty } from '@nestjs/swagger';
import {
  TransmissionType,
  VehicleCondition,
  SeatbeltType,
} from './create-vehicle.dto';

export class VehicleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  make: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  seats: number;

  @ApiProperty({ required: false })
  vehicleImage?: string;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  hasSeatBelts: boolean;

  @ApiProperty({ enum: SeatbeltType })
  seatBeltType: SeatbeltType;

  @ApiProperty({ enum: VehicleCondition })
  condition: VehicleCondition;

  @ApiProperty()
  value: number;

  @ApiProperty()
  vin: string;

  @ApiProperty()
  mileage: number;

  @ApiProperty({ enum: TransmissionType })
  transmission: TransmissionType;

  @ApiProperty()
  salesTaxPaid: boolean;

  @ApiProperty()
  trim: string;

  @ApiProperty()
  bodyStyle: string;

  @ApiProperty()
  hasSalvageTitle: boolean;

  @ApiProperty()
  extraInfo: string;

  @ApiProperty()
  userId: string;
}
