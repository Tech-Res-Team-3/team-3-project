import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseUser } from 'src/user/types';
import { CurrentUser } from 'src/user/decorators';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async upsertUser(data: {
    firebaseUid: string;
    email: string;
    displayName?: string;
    role: 'GUEST' | 'ADMIN';
  }) {
    const [firstName, lastName] = data.displayName
      ? data.displayName.split(' ')
      : data.email
        ? [data.email.split('@')[0], '']
        : ['Unknown', 'User'];

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

  async login(@CurrentUser() user) {
    if (!user.role) {
      throw new UnauthorizedException(
        'User does not exist. Please create an account',
      );
    }

    return {
      message: 'Login Successful',
      user,
    };
  }
}
