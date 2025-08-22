import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetUsersParamDto } from '../dto/get-users-param.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  
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
  
  async getUsers(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return this.prisma.user.findMany();
  }
  
  async getUserById(firebaseUid: string) {
    return this.prisma.user.findUnique({ where: { firebaseUid } });
  }
  
  async updateUser (firebaseUid: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { firebaseUid } });
    
    if (!user) throw new Error('User not found');
    return this.prisma.user.update({
      where: { firebaseUid },
      data,
    });
  }
  
  async promoteToHost(firebaseUid: string) {
    const user = await this.prisma.user.findUnique({ where: { firebaseUid } });
    
    if (!user) throw new Error('User not found');
    const newRole = user.role === 'GUEST' ? 'HOST' : 'GUEST';
    return this.prisma.user.update({
      where: { firebaseUid },
      data: { role: newRole },
    });
  }
  
  async deleteUser(firebaseUid: string) {
    return this.prisma.user.delete({ where: { firebaseUid } });
  }
}
