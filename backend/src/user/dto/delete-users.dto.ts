import { GetUsersParamDto } from "./get-users-param.dto";

/**
 * DTO for deleting users, extends GetUsersParamDto to reuse uid filtering.
 */
export class DeleteUsersDto extends GetUsersParamDto{
    /**
     * No additional properties; inherits uid from GetUsersParamDto.
     */
}