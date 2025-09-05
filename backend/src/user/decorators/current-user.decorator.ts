import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../types';

/** Custom decorator to extract the current authenticated user from the request. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || null;
  },
);
