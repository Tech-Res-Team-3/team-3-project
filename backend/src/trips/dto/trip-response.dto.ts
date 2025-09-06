import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LatLngDto } from './lat-lng.dto';
import { Status } from '@prisma/client';

/** Dto of the trip response */
export class TripResponseDto {
  /** ID of the trip */
  @ApiProperty({ example: 1, description: 'Unique identifier of the trip' })
  id: number;

  /** Start location of the trip in lat and lng */
  @ApiProperty({
    type: LatLngDto,
    description: 'Starting location coordinates',
  })
  startLocation: LatLngDto;

  /** End location of the trip in lat and lng */
  @ApiProperty({
    type: LatLngDto,
    description: 'End location coordinates',
  })
  endLocation: LatLngDto;

  /** The date and time of the start of the trip */
  @ApiProperty({
    example: '2025-09-05T10:00:00Z',
    description: 'Trip start date and time',
  })
  startAt: string;

  /** the date and time of the end of the trip */
  @ApiProperty({
    example: '2025-09-05T10:00:00Z',
    description: 'Trip start date and time',
  })
  endAt: string;

  /** The status of the trip */
  @ApiProperty({
    enum: Status,
    example: Status.SCHEDULED,
    description: 'Current status of the trip',
  })
  status: Status;

  /** The price of the trip */
  @ApiProperty({ example: 25.5, description: 'Price of the trip' })
  price: number;

  /** Optional discount for the trip */
  @ApiPropertyOptional({
    example: 5,
    description: 'Discount applied to the trip (if any)',
  })
  discount?: number;

  /** Optional rating of the trip */
  @ApiPropertyOptional({
    example: 4.8,
    description: 'Rating given for the trip (if any)',
  })
  rating?: number;

  /** The ID of the user associated with the trip */
  @ApiProperty({ example: 1 })
  userId: number;

  /** The ID of the vehicle associated with the vehicle */
  @ApiProperty({ example: 1 })
  vehicleId: number;

  /** The date and time that the trip was created */
  @ApiProperty({ example: '2025-09-05T09:55:00Z' })
  createdAt: string;

  /** The date and time that the trip was updated */
  @ApiProperty({ example: '2025-09-05T10:05:00Z' })
  updatedAt: string;
}
