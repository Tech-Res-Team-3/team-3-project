import { Body, Controller, Post, Get, UseGuards, Param, Query, Patch, ParseIntPipe, DefaultValuePipe, ValidationPipe, Delete, } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { SyncUserDto } from './dto/sync-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './types';
import { PatchUserDto } from './dto/patch-user.dto';
import { GetUsersParamDto } from './dto/get-users-param.dto';

@UseGuards(FirebaseAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}
  
  @Get('{/:id}')
  getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
     
  ) {
    return this.usersService.getUsers(getUsersParamDto, limit, page);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: number, 
    @Body() body: PatchUserDto,
  ) {
    console.log(`Updating user with ID: ${id}`, body);
    return { message: `User with ID ${id} updated successfully`, data: body };
  }

  @Delete('/:id')
  deleteUsers(
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(`Deleting user with ID: ${id}`);
    return { message: `User with ID ${id} deleted successfully` };
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('sync')
  async syncUser(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: SyncUserDto,
  ) {
    const dbUser = await this.usersService.upsertUser({
      firebaseUid: user.uid,
      email: user.email,
      displayName: user.name,
      role: body.role === 'ADMIN' ? 'ADMIN' : 'GUEST',
    });
    return { message: 'User synced', user: dbUser };
  }

  @Patch('promote-to-host')
  async promoteToHost(@CurrentUser() user: AuthenticatedUser) {
    const updatedUser = await this.usersService.promoteToHost(user.uid);
    return { message: 'User promoted to host', user: updatedUser };
  }
}
