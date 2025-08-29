import { Module } from '@nestjs/common';
import { BookingService } from './providers/booking.service';
import { BookingController } from './booking.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  providers: [BookingService, FirebaseService],
  controllers: [BookingController],
  imports: [],
})
export class BookingModule {}
