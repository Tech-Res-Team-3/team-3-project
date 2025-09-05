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
import { CreateAddressDto } from './dto/create-addresses.dto';
import { CurrentUser } from 'src/user/decorators';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/** Controller to manage address-related endpoints */
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
    summary: 'Create a new address for the authenticated user',
    description: 'Creates a new address associated with the current user.',
  })
  @ApiResponse({
    status: 201,
    description: 'The address has been successfully created.',
  })
  @Post()
  createAddress(@Body() dto: CreateAddressDto, @CurrentUser() user: any) {
    return this.addressesService.createAddress(user.uid, dto);
  }

  @ApiOperation({
    summary: 'Get addresses of the authenticated user',
    description: 'Retrieves all addresses associated with the current user.',
  })
  @Get('/my-addresses')
  getMyAddresses(@CurrentUser() user: any) {
    return this.addressesService.getMyAddresses(user.uid);
  }

  /** Update an existing address for the authenticated user */
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
  @Delete('/:id')
  deleteAddress(@Param('id') id: string) {
    return this.addressesService.deleteAddress(parseInt(id));
  }
}
