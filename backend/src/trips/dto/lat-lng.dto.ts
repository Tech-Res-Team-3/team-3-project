import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LatLngDto {
  @ApiProperty({ example: 40.7128, description: 'Latitude of the location' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -74.006, description: 'Longitude of the location' })
  @IsNumber()
  longitude: number;
}
