import * as admin from 'firebase-admin';
import * as firebase from 'firebase/app';
import * as dotenv from 'dotenv';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}

const clientApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
});

const clientAuth = getAuth(clientApp);

async function createAdminUser(email: string, password: string) {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'ADMIN' });

    const userCredentials = await signInWithEmailAndPassword(
      clientAuth,
      email,
      password,
    );
    const idToken = await userCredentials.user.getIdToken(true);

    console.log(`ADMIN role token: ${idToken}`);
  } catch (error) {
    console.log('Error creating admin user:', error);
  }
}

createAdminUser('admin@test.com', 'test123');
