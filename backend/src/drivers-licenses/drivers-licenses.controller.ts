import { Controller, Post } from '@nestjs/common';
import { DriversLicensesService } from './providers/drivers-licenses.service';

@Controller('drivers-licenses')
export class DriversLicensesController {
    constructor(
        private driversLicensesService: DriversLicensesService
    ) {}

    @Post()
    createDriversLicense(
        
    ) {

    }
}
