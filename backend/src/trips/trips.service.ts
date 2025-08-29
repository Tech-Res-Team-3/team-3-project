import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto, UpdateTripDto } from './dto';
import { BookingService } from 'src/booking/providers/booking.service';
import { CreateBookingDto } from 'src/booking/dto/create-booking.dto';
import { BookingStatus } from 'src/booking/enums/booking-status.enums';

@Injectable()
export class TripsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingService: BookingService,
  ) {}

  async createTrip(firebaseUid: string, dto: CreateTripDto) {
    const trip = await this.prisma.trip.create({
      data: {
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
        startLocation: dto.startLocation,
        endLocation: dto.endLocation,
        status: dto.status,
        price: dto.price,
        discount: dto.discount,
        rating: dto.rating,
        user: {
          connect: { firebaseUid },
        },
        vehicle: {
          connect: { id: dto.vehicleId },
        },
      },
    });
    await this.bookingService.createBooking(
      firebaseUid,
      {
        tripId: trip.id,
        bookedAt: new Date(),
        status: BookingStatus.PENDING
      }
    );
    return trip;

  }

  async updateTrip(id: number, data: UpdateTripDto) {
    return await this.prisma.trip.update({
      where: { id },
      data,
    });
  }

  async getMyTrips(firebaseUid: string) {
    return await this.prisma.trip.findMany({
      where: {
        user: { firebaseUid },
      },
    });
  }
}
