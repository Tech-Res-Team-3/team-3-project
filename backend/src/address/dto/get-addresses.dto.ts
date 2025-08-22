import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAddressesDto {
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
  
  @IsNumber()
  @Type(() => Number)
  latitude: number;
  
  @IsNumber()
  @Type(() => Number)
  longitude: number;
}