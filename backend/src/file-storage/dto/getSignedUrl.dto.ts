import { IsOptional, IsString } from 'class-validator';

/** Data Transfer Object for obtaining a signed URL for file access */
export class GetSignedUrlDto {
  /** The path of the file for which the signed URL is requested */
  @IsString()
  path: string;

  /** Optional folder within the storage bucket */
  @IsOptional()
  @IsString()
  folder?: string;
}
