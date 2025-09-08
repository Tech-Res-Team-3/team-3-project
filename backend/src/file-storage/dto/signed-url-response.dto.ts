import { ApiProperty } from '@nestjs/swagger';

/** Dto of the signed url response */
export class SignedUrlResponseDto {
  /** URL of the image */
  @ApiProperty({
    example:
      'https://storage.googleapis.com/your-bucket/uuid.jpg?GoogleAccessId=...',
  })
  url: string;

  /** File path of the image */
  @ApiProperty({ example: 'uploads/uuid.jpg' })
  filePath: string;
}
