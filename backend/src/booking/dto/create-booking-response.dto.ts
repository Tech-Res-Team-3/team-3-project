import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

/** Dto representing a booking */
export class CreateBookingResonseDto {
  /** Unique identifier of the booking */
  @ApiProperty({ example: 1 })
  id: number;

  /** Timestamp when the booking was made */
  @ApiProperty({ example: '2025-09-05T10:00:00Z' })
  bookedAt: string;

  /** Strip payment ID associated with the booking */
  @ApiProperty({ example: 'pi_3Kxyz123abc' })
  stripeId?: string;

  /** Current status of the booking */
  @ApiProperty({ enum: BookingStatus, example: BookingStatus.PENDING })
  status: BookingStatus;

  /** ID of the user who made the booking */
  @ApiProperty({ example: 1 })
  userId: number;

  /** ID of the trip associated with the booking */
  @ApiProperty({ example: 42 })
  tripId?: number;
}
