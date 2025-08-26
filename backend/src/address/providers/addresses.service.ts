import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from '../dto/create-addresses.dto';
import { GetUsersParamDto } from 'src/user/dto/get-users-param.dto';
import { UsersService } from 'src/user/providers/users.service';

@Injectable()
export class AddressesService {
    constructor(
        private readonly usersService: UsersService,
        private prisma: PrismaService
    ) {}
    
    async createAddress(firebaseUid: string, dto: CreateAddressDto) {
        const user = await this.usersService.getUserById(firebaseUid!);

        if (!user) {
            throw new Error('User not found');
        }

        return this.prisma.address.create({
            data: {
                ...dto,
                userId: user.id
            },
        });
    }


    async getAddresses(firebaseUid: string){
        const user = await this.usersService.getUserById(firebaseUid);

        return user?.addresses ?? []; 
    }

    async updateAddress(id: number, updateAddressDto: Partial<CreateAddressDto>) {
        const address = await this.prisma.address.update({
            where: { id },
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
