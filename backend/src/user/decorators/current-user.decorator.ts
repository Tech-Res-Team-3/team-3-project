import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FirebaseUser } from '../types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FirebaseUser | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || null;
  },
);