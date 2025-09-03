import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { VehicleService } from './providers/vehicle.service';

@Module({
  imports: [FirebaseModule],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
