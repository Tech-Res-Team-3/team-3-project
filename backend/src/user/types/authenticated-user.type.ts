import { FirebaseUser } from 'src/user/types/firebase-user.type';

export interface AuthenticatedUser extends FirebaseUser {
  role: 'ADMIN' | 'GUEST' | null;
  dbId?: number | null;
}
