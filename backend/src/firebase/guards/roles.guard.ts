import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/firebase/decorators/roles.decorator';

/** Guard to enforce role-based access control */
@Injectable()
export class RolesGuard implements CanActivate {
  /** Dependency injection of Reflector */
  constructor(private reflector: Reflector) {}

  /** Check if the user has one of the required roles to access the route */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `Requires role: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
