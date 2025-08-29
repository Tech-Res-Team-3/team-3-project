import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { BookingService } from 'src/booking/providers/booking.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [TripsController],
  providers: [TripsService, BookingService, FirebaseService],
  imports: [],
})
export class TripsModule {}
