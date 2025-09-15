import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for synchronizing user information.
 */
export class SyncUserDto {
  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  firstName: string;
}
