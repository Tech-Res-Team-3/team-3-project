import { Controller, Get, Post, Patch, Put, Delete, Body, UseGuards, Req, Param } from '@nestjs/common';
import { AddressesService } from './providers/addresses.service';
import { GetAddressesDto } from './dto/get-addresses.dto';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { CreateAddressDto } from './dto/create-addresses.dto';
import { CurrentUser } from 'src/user/decorators';

@UseGuards(FirebaseAuthGuard)
@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService
    ) {}

    @Post()
    createAddress(
        @Body() dto: CreateAddressDto,
        @Req() req: any
    ) {
        return this.addressesService.createAddress(req.user.uid, dto);
    }

    @Get()
    getAddresses(
        @CurrentUser() user: any
    ) {
        // Implementation for getting addresses
        return this.addressesService.getAddresses(user.firebaseUid);
    }

    @Get()
    getAllAddresses() {
        return this.addressesService.getAddresses('all');
    }

    @Patch('/:id')
    updateAddress(
        @Param('id') id: string,
        @Body() updateAddressDto: any
    ) {}

    @Delete('/:id')
    deleteAddress(
        @Param('id') id: string
    ) {
        return { message: `Address with id ${id} deleted` };
    }

}
