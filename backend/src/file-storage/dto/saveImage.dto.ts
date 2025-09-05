import { IsString, IsOptional } from 'class-validator';

/** Data Transfer Object for saving image metadata */
export class SaveImageDto {
  /** The file path where the image is stored */
  @IsString()
  filePath: string;

  /** The ID of the user associated with the image */
  @IsOptional()
  userId: number;

  /** The ID of the vehicle associated with the image */
  @IsOptional()
  vehicleId?: number;
}
