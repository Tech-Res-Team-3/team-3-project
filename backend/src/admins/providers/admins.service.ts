import { Body, Injectable, Param, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersFilter } from '../dto';
import { PatchUserDto } from 'src/user/dto/patch-user.dto';
import { UpdateAddressDto } from 'src/address/dto';
import { UpdateVehicleDto } from 'src/vehicle/dto';
import { UpdateDriversLicenseDto } from 'src/drivers-licenses/dto';

/** Service to manage admin-related operations */
@Injectable()
export class AdminsService {
  /** Initialize prismaService */
  constructor(private prisma: PrismaService) {}

  /** Get all users endpoint */
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

  /** Get a single user with all related nested data */
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

  /** Update a users information */
  async updateUser(firebaseUid: string, pathUserDto: PatchUserDto) {
    return await this.prisma.user.update({
      where: { firebaseUid },
      data: { ...pathUserDto },
    });
  }

  async updateAddress(id: number, updateAddressDto: UpdateAddressDto) {
    return await this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async updatevehicle(id: number, updateVehicleDto: UpdateVehicleDto) {
    return await this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async updateLicense(
    id: number,
    updateDriversLicenseDto: UpdateDriversLicenseDto,
  ) {
    return await this.prisma.driverLicense.update({
      where: { id },
      data: updateDriversLicenseDto,
    });
  }

  async approveVehicle(id: number) {
    return await this.prisma.vehicle.update({
      where: { id },
      data: {
        verified: true,
      },
    });
  }
}
