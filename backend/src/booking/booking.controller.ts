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
import { CurrentUser } from 'src/user/decorators';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateBookingResonseDto,
  CreateBookingDto,
  UpdateBookingDto,
} from './dto';

/** Controller to manage booking-related endpoints */
@ApiBearerAuth('firebase-auth')
@UseGuards(FirebaseAuthGuard)
@Controller('booking')
@ApiTags('Bookings')
export class BookingController {
  /** Dependency injection of BookingService */
  constructor(private readonly bookingService: BookingService) {}

  /** Endpoint to create a new booking */
  @ApiOperation({
    summary: 'Create a booking object (requires Firebase Auth)',
  })
  @ApiCreatedResponse({
    type: CreateBookingResonseDto,
    description: 'Successfully created booking',
  })
  @Post()
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser('uid') uid: string,
  ) {
    return this.bookingService.createBooking(uid, createBookingDto);
  }

  /** Endpoint to change the status of an existing booking */
  @ApiOperation({
    summary: 'Update a booking object (required Firebase Auth)',
  })
  @ApiOkResponse({
    type: UpdateBookingDto,
    description: 'Successfully updated booking',
  })
  @ApiBody({
    type: UpdateBookingDto,
    examples: {
      updateIssuingState: {
        summary: 'Update the issuing state of the license',
        value: {
          status: 'CONFIRMED',
        },
      },
    },
  })
  @Patch(':id/status')
  changeBookingStatus(
    @Param('id') bookingId: number,
    @Body() dto: UpdateBookingDto,
    @CurrentUser('uid') uid: string,
  ) {
    return this.bookingService.changeBookingStatus(uid, bookingId, dto.status);
  }
}
