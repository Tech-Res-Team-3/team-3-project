import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

/** Guard to protect routes using Firebase authentication */
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  /** Dependency injection of FirebaseService and PrismaService */
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prisma: PrismaService,
  ) {}

  /** Validate the request's Firebase ID token and attach user info to the request */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const idToken = authHeader.split(' ')[1];

    try {
      const decodedToken =
        await this.firebaseService.auth.verifyIdToken(idToken);

      const dbUser = await this.prisma.user.findUnique({
        where: { firebaseUid: decodedToken.uid },
      });

      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email,
        role: dbUser?.role ?? null,
        dbId: dbUser?.id ?? null,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
