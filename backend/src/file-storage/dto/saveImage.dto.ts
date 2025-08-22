import { IsString, IsOptional } from 'class-validator';

export class SaveImageDto {
  @IsString()
  filePath: string;

  @IsOptional()
  userId: number;

  @IsOptional()
  vehicleId?: number;
}
