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
import {
  CreateVehicleDto,
  NearbyVehicleResponseDto,
  UpdateVehicleDto,
  VehicleResponseDto,
} from './dto';
import { CurrentUser } from 'src/user/decorators';
import { VehicleService } from './providers/vehicle.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

/** Controller for vehicle-related operations */
@ApiTags('Vehicles')
@ApiBearerAuth('firebase-auth')
@UseGuards(FirebaseAuthGuard)
@Controller('vehicles')
export class VehicleController {
  /** Constructor for VehicleController */
  constructor(private readonly vehicleService: VehicleService) {}

  /** Endpoint to create a new vehicle */
  @Post()
  @ApiOperation({
    summary: 'Creates a new vehicle object (requires Firebase Auth)',
  })
  @ApiCreatedResponse({
    description: 'Vehicle object successfully created',
    type: VehicleResponseDto,
  })
  createVehicle(
    @CurrentUser() user: any,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return this.vehicleService.createVehicle(user.uid, createVehicleDto);
  }

  /** Endpoint to update an existing vehicle */
  @Patch('/:id')
  @ApiOperation({
    summary: 'Updates a vehicle object (requires Firebase Auth)',
  })
  @ApiOkResponse({
    description: 'Vehicle object succesfully updated',
    type: VehicleResponseDto,
  })
  @ApiBody({
    type: UpdateVehicleDto,
    examples: {
      updateColorAndTrim: {
        summary: 'Update color and mileage',
        value: {
          color: 'Black',
          mileage: 125000,
        },
      },
      updateTrim: {
        summary: 'Update trim level',
        value: {
          trim: 'XLE',
        },
      },
    },
  })
  updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(id, updatVehicleDto);
  }

  /** Endpoint to get all vehicles for the currently logged in user */
  @Get('/myVehicles')
  @ApiOperation({
    summary:
      'Fetches a list of vehicle objects connected to the currently logged in user (requires Firebase Auth',
  })
  @ApiOkResponse({
    description: 'List of vehicles belonging to the logged in user',
    type: VehicleResponseDto,
    isArray: true,
  })
  getMyVehicles(@CurrentUser() user: any) {
    return this.vehicleService.getMyVehicles(user.uid);
  }

  /** Endpoint to get vehicles nearby a specific location */
  @Get('nearby')
  @ApiOperation({
    summary:
      'Fetches a list of vehicle objects within a certain radius of the user (requires Firebase Auth)',
  })
  @ApiOkResponse({
    description: 'List of vehicles found within the given radius',
    type: NearbyVehicleResponseDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'lat',
    type: Number,
    description: 'Latitude of the search center',
    example: 40.7128,
  })
  @ApiQuery({
    name: 'lng',
    type: Number,
    description: 'Longitude of the search center',
    example: -74.006,
  })
  @ApiQuery({
    name: 'radius',
    type: Number,
    description: 'Search radius in Kilometers',
    example: 10,
  })
  async getNearbyVehicles(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
  ) {
    console.log('Received /vehicles/nearby:', {
      lat,
      lng,
      radius,
      types: { lat: typeof lat, lng: typeof lng, radius: typeof radius },
    });
    return this.vehicleService.findVehiclesNearby(lat, lng, radius);
  }
}
