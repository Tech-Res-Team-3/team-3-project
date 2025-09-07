import { VehicleResponseDto } from './vehicle-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

export class NearbyVehicleResponseDto {
  @ApiProperty({ type: VehicleResponseDto })
  vehicle: VehicleResponseDto;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @ApiProperty({
    description: 'Distance from search point in meters',
    example: 1200,
  })
  distanceMeters: number;
}
