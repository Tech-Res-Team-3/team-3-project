import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AddressesService {
    constructor(private prisma: PrismaService) {}

    async getAddresses() {
        return this.prisma.address.findMany();
    }

    async createAddress() {
        // Implementation for creating an address
        
    }
}
