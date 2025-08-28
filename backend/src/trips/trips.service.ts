import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto, UpdateTripDto } from './dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTrip(firebaseUid: string, dto: CreateTripDto) {
    return await this.prisma.trip.create({
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
