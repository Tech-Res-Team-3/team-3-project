import { Controller, Get, Post, Patch, Put, Delete, Body } from '@nestjs/common';
import { AddressesService } from './providers/addresses.service';
import { GetAddressesDto } from './dto/get-addresses.dto';

@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService

    ) {}

    @Get()
    getAddresses(
        @Body() getAddressesDto: GetAddressesDto,
    ) {
        // Implementation for getting addresses
        return "Successfully fetched addresses";
    }

    @Post()
    createAddress(
        @Body() body: any,
    ) {
        return "Address created successfully";
    }
}
