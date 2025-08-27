import { Module } from '@nestjs/common';
import { DriversLicensesController } from './drivers-licenses.controller';
import { DriversLicensesService } from './providers/drivers-licenses.service';
import { UsersModule } from 'src/user/users.module';

@Module({
  controllers: [DriversLicensesController],
  providers: [DriversLicensesService,],
  imports: [UsersModule],
})
export class DriversLicensesModule {}
