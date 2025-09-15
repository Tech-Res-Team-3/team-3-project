import { IsEnum, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsEnum(['GUEST', 'HOST', 'ADMIN'])
  role?: 'GUEST' | 'HOST' | 'ADMIN';
}
