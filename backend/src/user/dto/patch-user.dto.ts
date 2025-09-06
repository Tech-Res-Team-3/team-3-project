import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/** Data Transfer Object for updating user information. */
export class PatchUserDto {

  /**
   * First name of the user.
   */
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;
  
  /**
   * Last name of the user.
   */
  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  lastName: string;
  
  /**
   * Phone number of the user (optional).
   */
  @ApiProperty({
    description: 'Phone number of the user',
    example: '(123) 456-7890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
