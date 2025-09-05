import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';

/** Data Transfer Object for updating a trip */
export class UpdateTripDto extends PartialType(CreateTripDto) {}
