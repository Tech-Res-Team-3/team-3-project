import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';
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

  @Patch('/:id')
  updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(id, updatVehicleDto);
  }

  @Get('/myVehicles')
  getMyVehicles(@CurrentUser() user: any) {
    return this.vehicleService.getMyVehicles(user.firebaseUid);
  }
}
