import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DriversLicensesService } from './providers/drivers-licenses.service';
import { CreateDriversLicenseDto } from './dto/create-drivers-license.dto';
import { CurrentUser } from 'src/user/decorators';
import { UpdateDriversLicenseDto } from './dto/update-drivers-license.dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { ApiTags } from '@nestjs/swagger';

/** Controller to manage drivers' licenses-related endpoints */
@UseGuards(FirebaseAuthGuard)
@Controller('drivers-licenses')
@ApiTags('Drivers Licenses')
export class DriversLicensesController {
  /** Dependency injection of DriversLicensesService */
  constructor(private driversLicensesService: DriversLicensesService) {}

  /** Endpoint to create a new drivers license */
  @Post()
  createDriversLicense(
    @Body() createDriversLicenseDto: CreateDriversLicenseDto,
    @CurrentUser() user: any,
  ) {
    return this.driversLicensesService.createDriversLicense(
      user.uid,
      createDriversLicenseDto,
    );
  }

  /** Endpoint to retrieve all drivers licenses for the authenticated user */
  @Get()
  getDriversLicenses(@CurrentUser() user: any) {
    return this.driversLicensesService.getDriversLicenses(user.uid);
  }

  /** Endpoint to update a specific drivers license */
  @Patch('/:id')
  updateDriversLicense(
    @Param('id') id: string,
    @Body() updateDriversLicenseDto: UpdateDriversLicenseDto,
    @CurrentUser() user: any,
  ) {
    return this.driversLicensesService.updateDriversLicense(
      user.firebaseUid,
      parseInt(id),
      updateDriversLicenseDto,
    );
  }
}
