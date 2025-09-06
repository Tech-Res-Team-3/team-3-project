import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Dto for the save image response */
export class SaveImageResponseDto {
  /** File path for the image */
  @ApiProperty({ example: 'images/uuid.jpg' })
  filePath: string;

  /** Optional user id that the image is associated with */
  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the user who uploaded the image',
    required: false,
  })
  userId?: number;

  /** Optional vehicle id that the image is associated with */
  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the vehicle associated with the image',
    required: true,
  })
  vehicleId?: number;
}
