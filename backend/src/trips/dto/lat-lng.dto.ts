import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/** Dto for the lat and lng */
export class LatLngDto {
  /** Latitude of the location */
  @ApiProperty({ example: 40.7128, description: 'Latitude of the location' })
  @IsNumber()
  latitude: number;

  /** Longitude of the location */
  @ApiProperty({ example: -74.006, description: 'Longitude of the location' })
  @IsNumber()
  longitude: number;
}
