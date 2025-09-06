import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LatLngDto } from './lat-lng.dto';
import { Status } from '@prisma/client';

export class TripResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the trip' })
  id: number;

  @ApiProperty({
    type: LatLngDto,
    description: 'Starting location coordinates',
  })
  startLocation: LatLngDto;

  @ApiProperty({
    type: LatLngDto,
    description: 'End location coordinates',
  })
  endLocation: LatLngDto;

  @ApiProperty({
    example: '2025-09-05T10:00:00Z',
    description: 'Trip start date and time',
  })
  startAt: string;

  @ApiProperty({
    example: '2025-09-05T10:00:00Z',
    description: 'Trip start date and time',
  })
  endAt: string;

  @ApiProperty({
    enum: Status,
    example: Status.SCHEDULED,
    description: 'Current status of the trip',
  })
  status: Status;

  @ApiProperty({ example: 25.5, description: 'Price of the trip' })
  price: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'Discount applied to the trip (if any)',
  })
  discount?: number;

  @ApiPropertyOptional({
    example: 4.8,
    description: 'Rating given for the trip (if any)',
  })
  rating?: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  vehicleId: number;

  @ApiProperty({ example: '2025-09-05T09:55:00Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-09-05T10:05:00Z' })
  updatedAt: string;
}
