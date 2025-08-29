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
import { TripsService } from './trips.service';
import { CurrentUser } from 'src/user/decorators';
import { CreateTripDto, UpdateTripDto } from './dto';
import { FirebaseAuthGuard } from 'src/firebase/guards/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  createTrip(@CurrentUser() user: any, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.createTrip(user.uid, createTripDto);
  }

  @Patch('/:id')
  updateTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body() updaetTripDto: UpdateTripDto,
  ) {
    return this.tripsService.updateTrip(id, updaetTripDto);
  }

  @Get('/myTrips')
  getMyTrips(@CurrentUser() user: any) {
    return this.tripsService.getMyTrips(user.uid);
  }
}
