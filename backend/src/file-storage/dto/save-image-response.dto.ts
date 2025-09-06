import { ApiProperty } from '@nestjs/swagger';

export class SaveImageResponseDto {
  @ApiProperty({ example: 'images/uuid.jpg' })
  filePath: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who uploaded the image',
    required: false,
  })
  userId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the vehicle associated with the image',
    required: true,
  })
  vehicleId?: number;
}
