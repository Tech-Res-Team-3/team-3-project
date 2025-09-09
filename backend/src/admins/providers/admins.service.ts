import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersFilter } from '../dto';

/** Service to manage admin-related operations */
@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(filterDto: GetUsersFilter) {
    const { firstName, lastName, firebaseUid } = filterDto;

    return this.prisma.user.findMany({
      where: {
        ...(firstName && {
          firstName: { contains: firstName, mode: 'insensitive' },
        }),
        ...(lastName && {
          lastName: { contains: lastName, mode: 'insensitive' },
        }),
        ...(firebaseUid && { firebaseUid }),
      },
    });
  }

  async getUser(firebaseUid: string) {
    return await this.prisma.user.findUnique({
      where: { firebaseUid },
      include: {
        vehicles: true,
        addresses: true,
        driverLicenses: true,
      },
    });
  }
}
