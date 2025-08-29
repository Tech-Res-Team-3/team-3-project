import { IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { BookingStatus } from "../enums/booking-status.enums";
import { IsValidMMDDYYYYDate } from "src/drivers-licenses/validators/is-valid-mmddyyyy-date.validator";


export class CreateBookingDto {

    @IsString()
    @IsValidMMDDYYYYDate()
    bookedAt: Date;

    @IsString()
    @IsEnum(BookingStatus, {
        message: `Status must be one of the following values: ${Object.values(BookingStatus).join(', ')}`
    })
    status: BookingStatus;

    @IsInt()
    tripId: number;

}