import { IsEnum, IsInt, IsString } from 'class-validator';
import { BookingStatus } from '../enums/booking-status.enums';
import { IsValidMMDDYYYYDate } from 'src/drivers-licenses/validators/is-valid-mmddyyyy-date.validator';

/** Data Transfer Object for creating a booking */
export class CreateBookingDto {
  /** The date when the booking is made */
  @IsString()
  @IsValidMMDDYYYYDate()
  bookedAt: Date;

  /** The status of the booking */
  @IsString()
  @IsEnum(BookingStatus, {
    message: `Status must be one of the following values: ${Object.values(BookingStatus).join(', ')}`,
  })
  status: BookingStatus;

  /** The ID of the trip associated with the booking */
  @IsInt()
  tripId: number;
}
