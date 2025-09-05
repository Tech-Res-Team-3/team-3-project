import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

/**
 * DTO for getting users with optional filtering by uid.
 */
export class GetUsersParamDto {
  /**
   * User ID to filter by.
   */
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Gets users with a specific id',
    example: '1h3476g5f',
  })
  uid?: string;
}