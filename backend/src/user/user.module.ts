import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';

@Module({
  imports: [FirebaseModule],
  providers: [UsersService, FirebaseAuthGuard],
  controllers: [UsersController],
})
export class UserModule {}
