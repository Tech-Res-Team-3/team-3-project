import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminsService } from './providers/admins.service';
import { GetUsersFilter } from './dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { Roles } from 'src/firebase/decorators/roles.decorator';
import { RolesGuard } from 'src/firebase/guards/roles.guard';

/** Controller to manage admin-related endpoints */
@Roles('ADMIN')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Controller('admin')
export class AdminsController {
  /** Controller to initialize adminService */
  constructor(private adminService: AdminsService) {}

  /** Get a list of all users that allows filtering */
  @Get('/users')
  async getAllUsers(@Query() filterDto: GetUsersFilter) {
    return this.adminService.getAllUsers(filterDto);
  }

  @Get('/users/{:firebaseUid}')
  async getUser(@Param('firebaseUid') firebaseUid: string) {
    return this.adminService.getUser(firebaseUid);
  }
}
