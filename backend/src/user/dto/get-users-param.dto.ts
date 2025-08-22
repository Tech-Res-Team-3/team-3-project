import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString } from "class-validator";


export class GetUsersParamDto {
  @IsOptional()
  @IsString()
  id?: string;
}