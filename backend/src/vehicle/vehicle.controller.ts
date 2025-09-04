import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';
import { CurrentUser } from 'src/user/decorators';
import { VehicleService } from './providers/vehicle.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(FirebaseAuthGuard)
@Controller('vehicles')
@ApiTags('Vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  createVehicle(
    @CurrentUser() user: any,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return this.vehicleService.createVehicle(user.uid, createVehicleDto);
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
    return this.vehicleService.getMyVehicles(user.uid);
  }

  @Get('nearby')
  async getNearbyVehicles(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
  ) {
    return this.vehicleService.findVehiclesNearby(lat, lng, radius);
  }
}
