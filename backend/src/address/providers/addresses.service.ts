import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from '../dto/create-addresses.dto';
import { GetUsersParamDto } from 'src/user/dto/get-users-param.dto';
import { UsersService } from 'src/user/providers/users.service';

@Injectable()
export class AddressesService {
    constructor(private readonly usersService: UsersService) {}
    
    
    getAddresses(firebaseUid: string){
        const user = this.usersService.getUserById(firebaseUid);

        return [
            {
                user: user,
                address: '123 Main St',
                city: 'Springfield',
                state: 'IL',
                zip: 62701,
                country: 'USA',
               longitude: -89.6501,
                latitude: 39.7817
            },
        ]
    }

    
}
