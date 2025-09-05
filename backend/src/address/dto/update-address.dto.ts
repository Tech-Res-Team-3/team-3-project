import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-addresses.dto';

/** DTO for updating an address */
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
