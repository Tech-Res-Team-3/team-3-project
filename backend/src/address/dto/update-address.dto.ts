import { CreateAddressDto } from "./create-addresses.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateAddressDto extends PartialType(CreateAddressDto) {

}