import { SetMetadata } from '@nestjs/common';

/** Metadata key for roles */
export const ROLES_KEY = 'roles';

/** Decorator to set roles metadata */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
