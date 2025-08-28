import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/providers/users.service';
import { CreateDriversLicenseDto } from '../dto/create-drivers-license.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDriversLicenseDto } from '../dto/update-drivers-license.dto';

@Injectable()
export class DriversLicensesService {
  constructor(private prisma: PrismaService) {}

  async createDriversLicense(
    firebaseUid: string,
    dto: CreateDriversLicenseDto,
  ) {
    const driverLicense = await this.prisma.driverLicense.create({
      data: {
        ...dto,
        user: {
          connect: { firebaseUid },
        },
      },
    });
    return driverLicense;
  }

  async getDriversLicenses(firebaseUid: string) {
    return this.prisma.driverLicense.findMany({
      where: {
        user: { firebaseUid },
      },
    });
  }

  async updateDriversLicense(
    firebaseUid: string,
    id: number,
    dto: Partial<UpdateDriversLicenseDto>,
  ) {
    const driverLicense = await this.prisma.driverLicense.updateMany({
      where: { id, user: { firebaseUid } },
      data: dto,
    });
    return driverLicense;
  }
}
