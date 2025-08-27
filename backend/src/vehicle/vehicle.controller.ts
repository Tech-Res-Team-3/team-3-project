import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { VehicleService } from 'src/vehicle/vehicle.service';

@UseGuards(FirebaseAuthGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  // @Post()
  // createVehicle(@Body() createVehicleDto:) {

  // }
}
