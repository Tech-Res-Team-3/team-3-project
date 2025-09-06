import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/** Data Transfer Object for obtaining a signed URL for file access */
export class GetSignedUrlDto {
  /** The path of the file for which the signed URL is requested */
  @ApiProperty({ example: 'profile-pic.jpg' })
  @IsString()
  path: string;

  /** Optional folder within the storage bucket */
  @ApiProperty({ example: 'uploads/users' })
  @IsOptional()
  @IsString()
  folder?: string;
}
