import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';

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

  async updateVehicle(id: number, data: UpdateVehicleDto) {
    const updatedVehicle = await this.prisma.vehicle.update({
      where: { id },
      data,
    });

    return updatedVehicle;
  }

  async getMyVehicles(firebaseUid: string) {
    const myVehicles = await this.prisma.vehicle.findMany({
      where: {
        user: { firebaseUid },
      },
    });

    return myVehicles;
  }
}
