import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

/** Data Transfer Object for saving image metadata */
export class SaveImageDto {
  /** The file path where the image is stored */
  @ApiProperty({ example: 'images/uuid.jpg' })
  @IsString()
  filePath: string;

  /** The ID of the user associated with the image */
  @ApiProperty({ example: 1 })
  @IsOptional()
  userId: number;

  /** The ID of the vehicle associated with the image */
  @ApiProperty({ example: 1 })
  @IsOptional()
  vehicleId?: number;
}
