import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async upsertUser(data: {
    firebaseUid: string;
    email: string;
    displayName?: string;
    role: 'GUEST' | 'ADMIN';
  }) {
    const [firstName, lastNameRaw] = data.displayName
      ? data.displayName.split(' ')
      : data.email
        ? [data.email.split('@')[0], '']
        : ['Unknown', 'User'];
    const lastName = lastNameRaw ?? '';

    return this.prisma.user.upsert({
      where: { firebaseUid: data.firebaseUid },
      update: {
        email: data.email,
        firstName,
        lastName,
        role: data.role,
      },
      create: {
        firebaseUid: data.firebaseUid,
        email: data.email,
        firstName,
        lastName,
        role: data.role,
      },
    });
  }
}
