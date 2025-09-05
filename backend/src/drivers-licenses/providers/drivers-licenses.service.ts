import { Injectable } from '@nestjs/common';
import { CreateDriversLicenseDto } from '../dto/create-drivers-license.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDriversLicenseDto } from '../dto/update-drivers-license.dto';

/** Service to manage drivers' licenses */
@Injectable()
export class DriversLicensesService {
  /** Dependency injection of PrismaService */
  constructor(private prisma: PrismaService) {}

  /** Create a new drivers license for the authenticated user */
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

  /** Retrieve all drivers licenses for the authenticated user */
  async getDriversLicenses(firebaseUid: string) {
    return this.prisma.driverLicense.findMany({
      where: {
        user: { firebaseUid },
      },
    });
  }

  /** Update a specific drivers license for the authenticated user */
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
