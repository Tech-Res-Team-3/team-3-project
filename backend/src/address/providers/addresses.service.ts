import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from '../dto/create-addresses.dto';
import { UsersService } from 'src/user/providers/users.service';

<<<<<<< HEAD
/** Service to manage addresses associated with users. */
=======
/** Class to manage addresses */
>>>>>>> f983ccbf68eac6db21bda2dfad93f03290a2759a
@Injectable()
export class AddressesService {
  /** Constructor to initialize services */
  constructor(private prisma: PrismaService) {}

  /** Create a new address */
  async createAddress(firebaseUid: string, dto: CreateAddressDto) {
    const address = await this.prisma.address.create({
      data: {
        ...dto,
        user: {
          connect: { firebaseUid },
        },
      },
    });
    return address;
  }

  /** Get all addresses for a currently logged in user */
  async getMyAddresses(firebaseUid: string) {
    return await this.prisma.address.findMany({
      where: { user: { firebaseUid } },
    });
  }

  /** Update an existing address */
  async updateAddress(
    firebaseUid: string,
    id: number,
    updateAddressDto: Partial<CreateAddressDto>,
  ) {
    const address = await this.prisma.address.update({
      where: { id, user: { firebaseUid } },
      data: updateAddressDto,
    });

    return address;
  }

  /** Delete an address */
  async deleteAddress(id: number) {
    await this.prisma.address.delete({
      where: { id },
    });
  }
}
