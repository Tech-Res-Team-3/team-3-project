import { GetUsersParamDto } from 'src/user/dto/get-users-param.dto';
import { GetAddressesDto } from './get-addresses.dto';
import { IntersectionType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto extends IntersectionType(
    GetAddressesDto,
    GetUsersParamDto
)  {
    
}