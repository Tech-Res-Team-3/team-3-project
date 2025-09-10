import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PatchUserDto } from '../dto/patch-user.dto';

/**
 * Class to connect to Users table in the database.
 */
@Injectable()
export class UsersService {
  /** Constructor to initialize PrismaService instance. */
  constructor(private readonly prisma: PrismaService) {}

  /** Creates a user in the database and authenticates them with FirebaseAuth. */
  async upsertUser(data: {
    firebaseUid: string;
    email: string;
    role: 'GUEST' | 'ADMIN';
  
  }) {
    return this.prisma.user.upsert({
      where: { firebaseUid: data.firebaseUid },
      update: {
        email: data.email,
      },
      create: {
        firebaseUid: data.firebaseUid,
        email: data.email,
        role: data.role,
      },
    });
  }

  /** Updates a user in the database. */
  async updateUser(firebaseUid: string, data: PatchUserDto) {
    const user = await this.prisma.user.update({
      where: { firebaseUid },
      data,
      include: { addresses: true },
    });

    if (!user) throw new Error('User not found');
    return this.prisma.user.update({
      where: { firebaseUid },
      data,
    });
  }

  /** Promotes a user to host or demotes them back to guest. */
  async promoteToHost(firebaseUid: string) {
    const user = await this.prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) throw new Error('User not found');
    const newRole = user.role === 'GUEST' ? 'HOST' : 'GUEST';
    return this.prisma.user.update({
      where: { firebaseUid },
      data: { role: newRole },
    });
  }

  async getMe(uid: string) {
    return await this.prisma.user.findUnique({
      where: { firebaseUid: uid },
    });
  }
}
