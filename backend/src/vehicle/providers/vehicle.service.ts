import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto';
import { isAscii } from 'buffer';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehicle(firebaseUid: string, data: CreateVehicleDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { firebaseUid },
        include: { addresses: true },
      });

      if (!user) throw new Error('User not found');
      if (user.addresses.length === 0) throw new Error('User has no address');

      const userAddress = user.addresses[0];

      return await this.prisma.vehicle.create({
        data: {
          ...data,
          vehicleImage: data.vehicleImage || '',
          user: {
            connect: { firebaseUid },
          },
          addresses: {
            connect: { id: userAddress.id },
          },
        },
        include: { addresses: true },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
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
