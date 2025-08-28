import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from '../dto/create-addresses.dto';
import { UsersService } from 'src/user/providers/users.service';

@Injectable()
export class AddressesService {
    constructor(
        private usersService: UsersService,
        private prisma: PrismaService
    ) {}
    
    async createAddress(
        firebaseUid: string,
        dto: CreateAddressDto
    ) {
        const address = await this.prisma.address.create({
            data: {
                ...dto,
                user: {
                    connect: { firebaseUid }
                }
            }
        });
        return address;
    }

    async getAddresses(firebaseUid: string) {
        const addresses = await this.prisma.address.findMany();

        return addresses; 
    }

    async updateAddress(
        firebaseUid: string,
        id: number,
        updateAddressDto: Partial<CreateAddressDto>
    ) {
        const address = await this.prisma.address.update({
            where: { id, user: { firebaseUid } },
            data: updateAddressDto
        });

        return address;
    }

    async deleteAddress(id: number) {
        await this.prisma.address.delete({
            where: { id }
        });
    }
    
}
