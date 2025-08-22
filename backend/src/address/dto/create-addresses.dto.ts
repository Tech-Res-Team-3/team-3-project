import { GetUsersParamDto } from 'src/user/dto/get-users-param.dto';
import { GetAddressesDto } from './get-addresses.dto';
import { IntersectionType } from '@nestjs/swagger';

export class CreateAddressDto extends IntersectionType(
    GetAddressesDto,
    GetUsersParamDto
)  {}