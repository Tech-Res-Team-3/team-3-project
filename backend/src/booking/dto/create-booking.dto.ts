import { IsEnum, IsInt, IsString } from 'class-validator';
import { BookingStatus } from '../enums/booking-status.enums';
import { IsValidMMDDYYYYDate } from 'src/drivers-licenses/validators/is-valid-mmddyyyy-date.validator';
import { ApiProperty } from '@nestjs/swagger';

/** Data Transfer Object for creating a booking */
export class CreateBookingDto {
  /** The date when the booking is made */
  @ApiProperty({
    example: '09/05/2025',
    description: 'the date that the trip was booked',
  })
  @IsString()
  @IsValidMMDDYYYYDate()
  bookedAt: Date;

  /** The status of the booking */
  @ApiProperty({
    example: 'PENDING',
    description: 'the status of the booking. This defaults to PENDING',
  })
  @IsString()
  @IsEnum(BookingStatus, {
    message: `Status must be one of the following values: ${Object.values(BookingStatus).join(', ')}`,
  })
  status: BookingStatus;

  /** The ID of the trip associated with the booking */
  @ApiProperty({
    example: 1,
    description: 'The id of the trip that the booking is associated with',
  })
  @IsInt()
  tripId: number;
}
