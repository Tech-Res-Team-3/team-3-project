import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto, TripResponseDto, UpdateTripDto } from '../dto';
import { BookingService } from 'src/booking/providers/booking.service';
import { BookingStatus } from 'src/booking/enums/booking-status.enums';
import { Trip } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

/** Service to manage trips */
@Injectable()
export class TripsService {
  /** Dependency injection of PrismaService and BookingService */
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingService: BookingService,
  ) {}

  private mapTripToResponse(trip: Trip): TripResponseDto {
    return {
      id: trip.id,
      startLocation: { latitude: trip.startLat, longitude: trip.startLng },
      endLocation: { latitude: trip.endLat, longitude: trip.endLng },
      startAt: trip.startAt.toISOString(),
      endAt: trip.endAt.toISOString(),
      status: trip.status,
      price: trip.price,
      discount: trip.discount,
      rating: trip.rating,
      userId: trip.userId,
      vehicleId: trip.vehicleId,
      createdAt: trip.createdAt.toISOString(),
      updatedAt: trip.updatedAt.toISOString(),
    };
  }

  /** Create a new trip */
  async createTrip(firebaseUid: string, dto: CreateTripDto) {
    const trip = await this.prisma.trip.create({
      data: {
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
        startLat: dto.startLocation.latitude,
        startLng: dto.startLocation.longitude,
        endLat: dto.endLocation.latitude,
        endLng: dto.endLocation.longitude,
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

    return this.mapTripToResponse(trip);
  }

  /** Update an existing trip */
  async updateTrip(id: number, dto: UpdateTripDto) {
    const prismaData: any = {};

    if (dto.startLocation) {
      prismaData.startLat = dto.startLocation.latitude;
      prismaData.startLng = dto.startLocation.longitude;
    }

    if (dto.endLocation) {
      prismaData.endLat = dto.endLocation.latitude;
      prismaData.endLng = dto.endLocation.longitude;
    }

    Object.assign(prismaData, {
      ...(dto.startAt && { startAt: new Date(dto.startAt) }),
      ...(dto.endAt && { endAt: new Date(dto.endAt) }),
      ...(dto.status && { status: dto.status }),
      ...(dto.price !== undefined && { price: dto.price }),
      ...(dto.discount !== undefined && { discount: dto.discount }),
      ...(dto.rating !== undefined && { rating: dto.rating }),
      ...(dto.vehicleId !== undefined && { vehicleId: dto.vehicleId }),
    });

    const updateTrip = await this.prisma.trip.update({
      where: { id },
      data: prismaData,
    });

    return this.mapTripToResponse(updateTrip);
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
