import {
  Body,
  Controller,
  UseGuards,
  Patch,
  Post,
  Get,
  ForbiddenException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { SyncUserDto } from './dto/sync-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './types';
import { PatchUserDto } from './dto/patch-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/** Controller to handle user-related endpoints. */
@UseGuards(FirebaseAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Updates the current user's information in the database. */
  @Patch()
  @ApiOperation({
    summary: 'Updates the current user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  updateUser(@CurrentUser() user: any, @Body() body: PatchUserDto) {
    return this.usersService.updateUser(user.uid, body);
  }

  /** Syncs the authenticated user with the database. */
  @ApiOperation({
    summary: 'Syncs the authenticated user with the database',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully synced.',
  })
  @Post('sync')
  async syncUser(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: SyncUserDto,
  ) {
    const dbUser = await this.usersService.upsertUser({
      firebaseUid: user.uid,
      email: user.email,
      role: body.role === 'ADMIN' ? 'ADMIN' : 'GUEST',
    });
    return { message: 'User synced', user: dbUser };
  }

  @Post('admin-sync')
  async syncAdminUser(@CurrentUser() user: AuthenticatedUser) {
    const dbUser = await this.usersService.verifyAdmin(user.uid);

    if (!dbUser) {
      throw new ForbiddenException('Not authorized for admin portal');
    }

    return { message: 'Admin access granted', user: dbUser };
  }

  /** Promotes the current user to host. */
  @ApiOperation({
    summary: 'Promotes the current user to host',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully promoted to host.',
  })
  @Patch('promote-to-host')
  async promoteToHost(@CurrentUser() user: AuthenticatedUser) {
    const updatedUser = await this.usersService.promoteToHost(user.uid);
    return { message: 'User promoted to host', user: updatedUser };
  }

  @Get('/me')
  async getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getMe(user.uid);
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }
}
