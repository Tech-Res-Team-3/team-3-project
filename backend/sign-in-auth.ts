import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import axios from 'axios';
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

async function getAdminCustomToken(email: string) {
  const user = await admin.auth().getUserByEmail(email);

  const customToken = await admin
    .auth()
    .createCustomToken(user.uid, { role: 'ADMIN' });

  const apiKey = 'AIzaSyATZcGPu4KJjm23a6Q6YB6r8_3pyOcCeuo';
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`,
    { token: customToken, returnSecureToken: true },
  );

  const idToken = (response.data as any).idToken;
  console.log('ID token:', idToken);
}

getAdminCustomToken('guest@test.com');
