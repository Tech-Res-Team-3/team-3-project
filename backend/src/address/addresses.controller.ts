import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { AddressesService } from './providers/addresses.service';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { CreateAddressDto, UpdateAddressDto, AddressResponseDto } from './dto';
import { CurrentUser } from 'src/user/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiTags,
  ApiNoContentResponse,
} from '@nestjs/swagger';

/** Controller to manage address-related endpoints */
@ApiBearerAuth('firebase-auth')
@UseGuards(FirebaseAuthGuard)
@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  /** Constructor to initialize services */
  constructor(
    private addressesService: AddressesService,
    private prisma: PrismaService,
  ) {}

  /** Create a new address for the authenticated user */
  @ApiOperation({
    summary: 'Create a new address object (requires Firebase Auth)',
  })
  @ApiCreatedResponse({
    type: AddressResponseDto,
    description: 'Successfully created address',
  })
  @Post()
  createAddress(@Body() dto: CreateAddressDto, @CurrentUser() user: any) {
    return this.addressesService.createAddress(user.uid, dto);
  }

  @ApiOperation({
    summary:
      'Fetch a list of address objects that belong to the user (requires Firebase Auth)',
  })
  @ApiOkResponse({
    type: AddressResponseDto,
    description: 'Successfully fetched addresses',
    isArray: true,
  })
  @Get('/my-addresses')
  getMyAddresses(@CurrentUser() user: any) {
    return this.addressesService.getMyAddresses(user.uid);
  }

  /** Update an existing address for the authenticated user */
  @ApiOperation({
    summary:
      'Update an address object for the currently logged in user (requires Firebase Auth)',
  })
  @ApiOkResponse({
    type: AddressResponseDto,
    description: 'Successfully updated the address',
  })
  @ApiBody({
    type: AddressResponseDto,
    examples: {
      updateStreetAddress: {
        summary: 'Update the street address',
        value: {
          street: '123 Central Ave.',
        },
      },
    },
  })
  @Patch('/:id')
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @CurrentUser() user: any,
  ) {
    return this.addressesService.updateAddress(
      user.firebaseUid,
      parseInt(id),
      updateAddressDto,
    );
  }

  /** Delete an address by its ID */
  @ApiOperation({
    summary:
      'Deletes the address with the id of the param in the url (requires Firebase Auth)',
  })
  @ApiNoContentResponse({ description: 'Address successfully deleted' })
  @Delete('/:id')
  deleteAddress(@Param('id') id: string) {
    return this.addressesService.deleteAddress(parseInt(id));
  }
}
