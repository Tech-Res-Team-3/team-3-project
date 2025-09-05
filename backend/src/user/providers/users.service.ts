import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetUsersParamDto } from '../dto/get-users-param.dto';
import { PatchUserDto } from '../dto/patch-user.dto';

/**
 * Class to connect to Users table in the database.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor to initialize PrismaService instance.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a user in the database and authenticates them with FirebaseAuth.
   */
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

  /**
   * Fetches users from the database.
   */
  async getUsers(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return this.prisma.user.findMany();
  }

  /**
   * Fetches a user by their Firebase UID.
   */
  async getUserById(firebaseUid: string) {
    return this.prisma.user.findUnique({ 
      where: { firebaseUid },
      include: { addresses: true } 
    });
  }

  /**
   * Updates a user in the database.
   */
  async updateUser(firebaseUid: string, data: PatchUserDto) {
    const user = await this.prisma.user.update({
       where: { firebaseUid },
       data,
       include: { addresses: true }
      });

    if (!user) throw new Error('User not found');
    return this.prisma.user.update({
      where: { firebaseUid },
      data,
    });
  }

  /**
   * Promotes a user to host or demotes them back to guest. 
   */  
  async promoteToHost(firebaseUid: string) {
    const user = await this.prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) throw new Error('User not found');
    const newRole = user.role === 'GUEST' ? 'HOST' : 'GUEST';
    return this.prisma.user.update({
      where: { firebaseUid },
      data: { role: newRole },
    });
  }

}
