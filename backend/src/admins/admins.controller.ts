import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './providers/admins.service';
import { GetUsersFilter, VehicleFilterDto } from './dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { Roles } from 'src/firebase/decorators/roles.decorator';
import { RolesGuard } from 'src/firebase/guards/roles.guard';
import { PatchUserDto } from 'src/user/dto/patch-user.dto';
import { UpdateAddressDto } from 'src/address/dto';
import { UpdateVehicleDto } from 'src/vehicle/dto';
import { UpdateDriversLicenseDto } from 'src/drivers-licenses/dto';

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

  @Get('/users/:firebaseUid')
  async getUser(@Param('firebaseUid') firebaseUid: string) {
    return this.adminService.getUser(firebaseUid);
  }

  @Get('/vehicles')
  async getAllVehicles(@Query() vehicleFilterDto: VehicleFilterDto) {
    return this.adminService.getAllVehicles(vehicleFilterDto);
  }

  @Get('/vehicles/:id')
  async getVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getVehicle(id);
  }

  @Patch('/user/:firebaseUid')
  async updateUser(
    @Param('firebaseUid') firebaseUid: string,
    @Body() pathUserDto: PatchUserDto,
  ) {
    return this.adminService.updateUser(firebaseUid, pathUserDto);
  }

  @Patch('/address/:id')
  async updateAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.adminService.updateAddress(id, updateAddressDto);
  }

  @Patch('/vehicle/:id')
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.adminService.updatevehicle(id, updateVehicleDto);
  }

  @Patch('/license/:id')
  async updateLicense(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDriversLicenseDto: UpdateDriversLicenseDto,
  ) {
    return this.adminService.updateLicense(id, updateDriversLicenseDto);
  }

  @Patch('/approve-vehicle/:id')
  async approveVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.approveVehicle(id);
  }
}
