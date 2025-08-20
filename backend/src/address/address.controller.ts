import { Controller, Get, Post, Patch, Put, Delete, Body } from '@nestjs/common';

@Controller('addresses')
export class AddressController {

    @Get()
    getAddresses() {
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
