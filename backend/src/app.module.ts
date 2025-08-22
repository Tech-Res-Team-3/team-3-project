import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/providers/users.service';
import { AddressesModule } from './address/addresses.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    FirebaseModule, 
    PrismaModule, 
    AddressesModule, 
    UsersModule,

  ],
  controllers: [
    UsersController, 
    AppController,

  ],
  providers: [
    AppService, 
    PrismaService, 
    UsersService,

  ],
})
export class AppModule {}
