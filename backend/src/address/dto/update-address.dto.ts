import { PartialType } from "@nestjs/swagger";
import { CreateAddressDto } from "./create-addresses.dto";

export class UpdateAddressDto extends PartialType(CreateAddressDto)  {

}