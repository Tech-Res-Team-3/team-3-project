import { IsOptional, IsString } from 'class-validator';

export class GetSignedUrlDto {
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  folder?: string;
}
