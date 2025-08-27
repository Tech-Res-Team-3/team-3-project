import { Controller } from '@nestjs/common';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}
}
