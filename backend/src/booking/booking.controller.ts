import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './providers/booking.service';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CurrentUser } from 'src/user/decorators';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags } from '@nestjs/swagger';

/** Controller to manage booking-related endpoints */
@UseGuards(FirebaseAuthGuard)
@Controller('booking')
@ApiTags('Bookings')
export class BookingController {
  /** Dependency injection of BookingService */
  constructor(private readonly bookingService: BookingService) {}

  /** Endpoint to create a new booking */
  @Post()
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser('uid') uid: string,
  ) {
    return this.bookingService.createBooking(uid, createBookingDto);
  }

  /** Endpoint to change the status of an existing booking */
  @Patch(':id/status')
  changeBookingStatus(
    @Param('id') bookingId: number,
    @Body() dto: UpdateBookingDto,
    @CurrentUser('uid') uid: string,
  ) {
    return this.bookingService.changeBookingStatus(uid, bookingId, dto.status);
  }
}
