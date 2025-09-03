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
import { ApiTags } from '@nestjs/swagger';

@UseGuards(FirebaseAuthGuard)
@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(
    private addressesService: AddressesService,
    private prisma: PrismaService,
  ) {}

  @Post()
  createAddress(@Body() dto: CreateAddressDto, @CurrentUser() user: any) {
    return this.addressesService.createAddress(user.uid, dto);
  }

  @Get('/my-addresses')
  getMyAddresses(
    @CurrentUser() user: any,
  ) {
    return this.addressesService.getMyAddresses(user.uid);
  }

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

  @Delete('/:id')
  deleteAddress(@Param('id') id: string) {
    return { message: `Address with id ${id} deleted` };
  }
}
