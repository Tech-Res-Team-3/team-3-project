import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as dotenv from 'dotenv';

dotenv.config();

/** Firebase app initialization for testing */
const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
});

/** Firebase Authentication */
const auth = getAuth(app);

async function signInAndGetAdminToken(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  const token = await userCred.user.getIdToken(true);

  console.log('Firebase ID Token with custom claims:', token);

  return token;
}

signInAndGetAdminToken('cameron-stanley@example.com', 'test123');
