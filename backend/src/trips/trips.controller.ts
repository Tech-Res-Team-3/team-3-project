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
import { TripsService } from './providers/trips.service';
import { CurrentUser } from 'src/user/decorators';
import { CreateTripDto, TripResponseDto, UpdateTripDto } from './dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

/** Controller to manage trips-related endpoints */
@ApiBearerAuth('firebase-auth')
@UseGuards(FirebaseAuthGuard)
@Controller('trips')
@ApiTags('Trips')
export class TripsController {
  /** Dependency injection of TripsService */
  constructor(private readonly tripsService: TripsService) {}

  /** Endpoint to create a new trip */
  @ApiOperation({
    summary: 'Creates a new trip object (requires Firebase Auth)',
  })
  @ApiCreatedResponse({
    description: 'Succesfully created a new trip',
    type: TripResponseDto,
  })
  @Post()
  createTrip(@CurrentUser() user: any, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.createTrip(user.uid, createTripDto);
  }

  /** Endpoint to update a specific trip */
  @ApiOperation({
    summary: 'Updates a trip object (requires Firebase Auth)',
  })
  @ApiOkResponse({
    description: 'Succesfully updated a trip',
    type: TripResponseDto,
  })
  @ApiBody({
    type: UpdateTripDto,
    examples: {
      updateStartLocation: {
        summary: 'Update the start location of your trip',
        value: {
          startLocation: {
            latitude: 40.7128,
            longitude: 74.006,
          },
        },
      },
    },
  })
  @Patch('/:id')
  updateTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.updateTrip(id, updateTripDto);
  }

  /** Endpoint to retrieve all trips for the authenticated user */
  @ApiOperation({
    summary:
      'Fetches a list of trip objects for the currently logged in user (requires Firebase Auth)',
  })
  @ApiOkResponse({
    description: 'Succesfully fetched users trips',
    type: TripResponseDto,
    isArray: true,
  })
  @Get('/myTrips')
  getMyTrips(@CurrentUser() user: any) {
    return this.tripsService.getMyTrips(user.uid);
  }
}
