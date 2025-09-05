/**
 * Interface representing a Firebase user.
 */
export interface FirebaseUser {
    /** Unique user identifier. */
    uid: string;
    /** User's email address. */
    email: string;
    /** User's name */
    name: string;
}