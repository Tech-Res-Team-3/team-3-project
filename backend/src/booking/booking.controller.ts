import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './providers/booking.service';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CurrentUser } from 'src/user/decorators';
import { UpdateBookingDto } from './dto/update-booking.dto';

@UseGuards(FirebaseAuthGuard)
@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
    ) {}

    @Post()
    createBooking(
        @Body() createBookingDto: CreateBookingDto,
        @CurrentUser('uid') uid: string,
    ) {
        return this.bookingService.createBooking(uid, createBookingDto);
    }

    @Patch(':id/status')
    changeBookingStatus(
        @Param('id') bookingId: number,
        @Body() dto: UpdateBookingDto,
        @CurrentUser('uid') uid: string,
    ) {
        return this.bookingService.changeBookingStatus(uid, bookingId, dto.status);
    }
}
