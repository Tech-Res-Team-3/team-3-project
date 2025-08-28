import { GetUsersParamDto } from 'src/user/dto/get-users-param.dto';
import { IntersectionType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAddressDto{
  @IsString()
  @MaxLength(255)
  street: string;

  @IsString()
  @MaxLength(100)
  city: string;

  @IsString()
  @MaxLength(100)
  state: string;

  @IsString()
  @MinLength(2)
  country: string;

  @IsNumber()
  @Type(() => Number)
  zip: number;
  
  @IsOptional()
  @IsNumber()
  latitude: number;
  
  @IsOptional()
  @IsNumber()
  longitude: number;

}