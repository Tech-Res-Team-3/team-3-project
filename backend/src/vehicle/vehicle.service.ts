import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehicle(firebaseUid: string, data: CreateVehicleDto) {
    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...data,
        vehicleImage: data.vehicleImage || '',
        user: {
          connect: { firebaseUid },
        },
      },
    });

    return vehicle;
  }
}
