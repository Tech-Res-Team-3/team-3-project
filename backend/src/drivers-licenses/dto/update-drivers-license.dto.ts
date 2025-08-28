import { PartialType } from "@nestjs/swagger";
import { CreateDriversLicenseDto } from "./create-drivers-license.dto";


export class UpdateDriversLicenseDto extends PartialType(CreateDriversLicenseDto) {}