import { Body, Controller, Post, Get, UseGuards, Param, Query, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { SyncUserDto } from './dto/sync-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './types';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get('/:id/')
  getUsers(@Query() query: any) {
    console.log({...query});
    return this.userService.getUsers();
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: number, 
    @Body() body: any
  ) {
    console.log(`Updating user with ID: ${id}`, body);
    return { message: `User with ID ${id} updated successfully`, data: body };
  }


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
