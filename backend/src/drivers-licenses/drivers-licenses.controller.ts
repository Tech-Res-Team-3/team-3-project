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
import {
  CreateDriversLicenseDto,
  UpdateDriversLicenseDto,
  CreateDriversLicenseResponseDto,
} from './dto';
import { CurrentUser } from 'src/user/decorators';

import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

/** Controller to manage drivers' licenses-related endpoints */
@ApiBearerAuth('firebase-auth')
@UseGuards(FirebaseAuthGuard)
@Controller('drivers-licenses')
@ApiTags('Drivers Licenses')
export class DriversLicensesController {
  /** Dependency injection of DriversLicensesService */
  constructor(private driversLicensesService: DriversLicensesService) {}

  /** Endpoint to create a new drivers license */
  @ApiOperation({
    summary: 'Creates a driver license object (requires Firebase Auth)',
  })
  @ApiCreatedResponse({
    type: CreateDriversLicenseResponseDto,
    description: 'Successfully created driver license',
  })
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
  @ApiOperation({
    summary:
      'Fetches a list of all driver license objects for the currently logged in user (requires Firebase Auth)',
  })
  @ApiOkResponse({
    type: CreateDriversLicenseResponseDto,
    description: 'Successfully fetched driver licenses',
    isArray: true,
  })
  @Get('/me')
  getDriversLicenses(@CurrentUser() user: any) {
    return this.driversLicensesService.getDriversLicenses(user.uid);
  }

  /** Endpoint to update a specific drivers license */
  @ApiOperation({
    summary: 'Updates a driver license object (requires Firebase Auth)',
  })
  @ApiOkResponse({
    description: 'Succesfully updated a trip',
    type: CreateDriversLicenseResponseDto,
  })
  @ApiBody({
    type: UpdateDriversLicenseDto,
    examples: {
      updateIssuingState: {
        summary: 'Update the issuing state of the license',
        value: {
          issuingState: 'SC',
        },
      },
    },
  })
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
