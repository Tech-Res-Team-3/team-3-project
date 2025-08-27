import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './providers/addresses.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersService } from 'src/user/providers/users.service';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AddressesController],
  providers: [AddressesService, FirebaseService,]
})
export class AddressesModule {}
