import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AddressModule } from './address/address.module';

@Module({
  imports: [FirebaseModule, PrismaModule, AddressModule],
  controllers: [UserController, AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
