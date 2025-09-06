import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto, UpdateTripDto } from '../dto';
import { BookingService } from 'src/booking/providers/booking.service';
import { BookingStatus } from 'src/booking/enums/booking-status.enums';

/** Service to manage trips */
@Injectable()
export class TripsService {
  /** Dependency injection of PrismaService and BookingService */
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingService: BookingService,
  ) {}

  /** Create a new trip */
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
    await this.bookingService.createBooking(firebaseUid, {
      tripId: trip.id,
      bookedAt: new Date(),
      status: BookingStatus.PENDING,
    });
    return trip;
  }

  /** Update an existing trip */
  async updateTrip(id: number, data: UpdateTripDto) {
    return await this.prisma.trip.update({
      where: { id },
      data,
    });
  }

  /** Retrieve all trips for the authenticated user */
  async getMyTrips(firebaseUid: string) {
    return await this.prisma.trip.findMany({
      where: {
        user: { firebaseUid },
      },
    });
  }
}
