import { Controller, Get, Post, Patch, Put, Delete, Body, UseGuards, Req, Param } from '@nestjs/common';
import { AddressesService } from './providers/addresses.service';
import { GetAddressesDto } from './dto/get-addresses.dto';
import { FirebaseAuthGuard } from '../firebase/guards/firebase-auth.guard';
import { CreateAddressDto } from './dto/create-addresses.dto';

// @UseGuards(FirebaseAuthGuard)
@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService
    ) {}

    @Get('{/:firebaseUid}')
    getAddresses(
        @Body() getAddressesDto: GetAddressesDto,
        @Param('firebaseUid') firebaseUid: string
    ) {
        // Implementation for getting addresses
        return this.addressesService.getAddresses(firebaseUid);
    }

}
