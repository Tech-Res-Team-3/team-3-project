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

/** Controller for vehicle-related operations */
@UseGuards(FirebaseAuthGuard)
@Controller('vehicles')
@ApiTags('Vehicles')
export class VehicleController {
  /** Constructor for VehicleController */
  constructor(private readonly vehicleService: VehicleService) {}

  /** Endpoint to create a new vehicle */
  @Post()
  createVehicle(
    @CurrentUser() user: any,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return this.vehicleService.createVehicle(user.uid, createVehicleDto);
  }

  /** Endpoint to update an existing vehicle */
  @Patch('/:id')
  updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(id, updatVehicleDto);
  }

  /** Endpoint to get all vehicles for the currently logged in user */
  @Get('/myVehicles')
  getMyVehicles(@CurrentUser() user: any) {
    return this.vehicleService.getMyVehicles(user.uid);
  }

  /** Endpoint to get vehicles nearby a specific location */
  @Get('nearby')
  async getNearbyVehicles(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
  ) {
    return this.vehicleService.findVehiclesNearby(lat, lng, radius);
  }
}
