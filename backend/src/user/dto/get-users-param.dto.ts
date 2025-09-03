import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString } from "class-validator";


export class GetUsersParamDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Gets users with a specific id',
    example: '1h3476g5f',
  })
  uid?: string;
}