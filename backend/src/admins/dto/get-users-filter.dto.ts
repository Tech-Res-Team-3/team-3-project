import { IsOptional, IsString } from 'class-validator';

export class GetUsersFilter {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  firebaseUid?: string;
}
