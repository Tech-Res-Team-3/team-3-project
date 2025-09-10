import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './providers/admins.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { RolesGuard } from 'src/firebase/guards/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [FirebaseModule],
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService, FirebaseAuthGuard, RolesGuard],
})
export class AdminsModule {}
