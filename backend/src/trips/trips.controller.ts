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
import { CreateTripDto, UpdateTripDto } from './dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';
import { ApiTags } from '@nestjs/swagger';

/** Controller to manage trips-related endpoints */
@UseGuards(FirebaseAuthGuard)
@Controller('trips')
@ApiTags('Trips')
export class TripsController {
  /** Dependency injection of TripsService */
  constructor(private readonly tripsService: TripsService) {}

  /** Endpoint to create a new trip */
  @Post()
  createTrip(@CurrentUser() user: any, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.createTrip(user.uid, createTripDto);
  }

  /** Endpoint to update a specific trip */
  @Patch('/:id')
  updateTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.updateTrip(id, updateTripDto);
  }

  /** Endpoint to retrieve all trips for the authenticated user */
  @Get('/myTrips')
  getMyTrips(@CurrentUser() user: any) {
    return this.tripsService.getMyTrips(user.uid);
  }
}
