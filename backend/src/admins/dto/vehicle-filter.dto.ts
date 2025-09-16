import { IsOptional, IsString } from 'class-validator';

export class VehicleFilterDto {
  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  model: string;
}
