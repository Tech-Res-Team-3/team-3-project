import {
  Body,
  Controller,
  UseGuards,
  Param,
  Query,
  Patch,
  Post,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { SyncUserDto } from './dto/sync-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './types';
import { PatchUserDto } from './dto/patch-user.dto';
import { GetUsersParamDto } from './dto/get-users-param.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * Controller to handle user-related endpoints.
 */
@UseGuards(FirebaseAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Updates the current user's information in the database.
   */
  @ApiBearerAuth('firebase-auth')
  @Patch('/updateMe')
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

  /**
   *
   * @param user
   * @param body
   * @returns
   * Syncs the authenticated user with the database.
   */
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
      displayName: user.name,
      role: body.role === 'ADMIN' ? 'ADMIN' : 'GUEST',
    });
    return { message: 'User synced', user: dbUser };
  }

  /**
   *
   * @param user
   * @returns
   * Promotes the current user to host.
   */
  @ApiBearerAuth('firebase-auth')
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
}
