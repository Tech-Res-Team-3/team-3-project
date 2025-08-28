import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DriversLicensesService } from './providers/drivers-licenses.service';
import { CreateDriversLicenseDto } from './dto/create-drivers-license.dto';
import { CurrentUser } from 'src/user/decorators';
import { UpdateDriversLicenseDto } from './dto/update-drivers-license.dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('drivers-licenses')
export class DriversLicensesController {
    constructor(
        private driversLicensesService: DriversLicensesService
    ) {}

    @Post()
    createDriversLicense(
        @Body() createDriversLicenseDto: CreateDriversLicenseDto,
        @CurrentUser() user:any
    ) {
        return this.driversLicensesService.createDriversLicense(user.uid, createDriversLicenseDto)
    }

    @Get()
    getDriversLicenses(
        @CurrentUser() user:any
    ) {
        return this.driversLicensesService.getDriversLicenses('all');
    }

    @Patch('/:id')
    updateDriversLicense(
        @Param('id') id: string,
        @Body() updateDriversLicenseDto: UpdateDriversLicenseDto,
        @CurrentUser() user:any
    ) {
        return this.driversLicensesService.updateDriversLicense(user.firebaseUid, parseInt(id), updateDriversLicenseDto);
    }
}
