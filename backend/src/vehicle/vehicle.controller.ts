import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CurrentUser } from 'src/user/decorators';

@UseGuards(FirebaseAuthGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  createVehicle(
    @CurrentUser() user: any,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return this.vehicleService.createVehicle(
      user.firebaseUid,
      createVehicleDto,
    );
  }
}
