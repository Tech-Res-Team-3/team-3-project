import { ApiProperty } from '@nestjs/swagger';

export class SignedUrlResponseDto {
  @ApiProperty({
    example:
      'https://storage.googleapis.com/your-bucket/uuid.jpg?GoogleAccessId=...',
  })
  url: string;

  @ApiProperty({ example: 'uploads/uuid.jpg' })
  filePath: string;
}
