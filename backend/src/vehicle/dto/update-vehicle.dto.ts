import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';

/** Data Transfer Object for updating a vehicle */
export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
