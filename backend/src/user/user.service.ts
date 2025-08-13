import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async upsertUser(data: {
        firebaseUid: string;
        email: string;
        displayName?: string;
        role: 'GUEST' | 'ADMIN';
    }) {
        return this.prisma.user.upsert({
            where: { firebaseUid: data.firebaseUid },
            update: data,
            create: data,
    })  };
}