import { FirebaseUser } from 'src/user/types/firebase-user.type';

/** Interface representing an authenticated user, extending FirebaseUser. */
export interface AuthenticatedUser extends FirebaseUser {
  /** Role of the user, can be 'ADMIN', 'GUEST', or null. */
  role: 'ADMIN' | 'GUEST' | null;
  /** Optional database ID of the user, can be null. */
  dbId?: number | null;
}
