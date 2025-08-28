import { Module } from '@nestjs/common';
import { DriversLicensesController } from './drivers-licenses.controller';
import { DriversLicensesService } from './providers/drivers-licenses.service';
import { UsersModule } from 'src/user/users.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [DriversLicensesController],
  providers: [DriversLicensesService, FirebaseService],
  imports: [UsersModule],
})
export class DriversLicensesModule {}
