import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/providers/users.service';
import { AddressesModule } from './address/addresses.module';
import { FileStorageModule } from './file-storage/file-storage.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { DriversLicensesModule } from './drivers-licenses/drivers-licenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FirebaseModule,
    PrismaModule,
    AddressesModule,
    FileStorageModule,
    UserModule,
    VehicleModule,
    DriversLicensesModule,

  ],
  controllers: [UsersController, AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
