import { PartialType } from '@nestjs/swagger';
import { CreateDriversLicenseDto } from './create-drivers-license.dto';

/** Data Transfer Object for updating a driver's license */
export class UpdateDriversLicenseDto extends PartialType(
  CreateDriversLicenseDto,
) {}
