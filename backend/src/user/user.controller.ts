import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { SyncUserDto } from './dto/sync-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './types';

@Controller('users')
export class UserController {
  @Get()
  public getUsers() {
    return this.userService.getUsers();}

  constructor(private userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('sync')
  async syncUser(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: SyncUserDto,
  ) {
    const dbUser = await this.userService.upsertUser({
      firebaseUid: user.uid,
      email: user.email,
      displayName: user.name,
      role: body.role === 'ADMIN' ? 'ADMIN' : 'GUEST',
    });
    return { message: 'User synced', user: dbUser };
  }
}
