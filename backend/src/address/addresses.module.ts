import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './providers/addresses.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserModule } from 'src/user/user.module';
import { UsersService } from 'src/user/providers/users.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AddressesController],
  providers: [AddressesService, FirebaseService, UsersService]
})
export class AddressesModule {}
