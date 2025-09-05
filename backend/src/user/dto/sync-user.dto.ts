import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

/**
 * Data Transfer Object for synchronizing user information.
 */
export class SyncUserDto {

    /**
     * Unique identifier for the user.
     */
    @ApiProperty({
        description: 'Unique identifier for the user',
    })
    @IsString()
    @IsOptional()
    role: string;
}

