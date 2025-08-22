import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AddressModule } from './address/address.module';
import { FileStorageModule } from './file-storage/file-storage.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FirebaseModule,
    PrismaModule,
    AddressModule,
    FileStorageModule,
    UserModule,
  ],
  controllers: [UserController, AppController],
  providers: [AppService],
})
export class AppModule {}
