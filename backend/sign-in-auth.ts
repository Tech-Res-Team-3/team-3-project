import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDnbB8w5ptAxE8HD60Pgypt1HZKmqGSFvY",
  authDomain: "rao-rentals.firebaseapp.com",
});

const auth = getAuth(app);

signInWithEmailAndPassword(auth, "kbrown@example.com", "P@$$w0rd!")
  .then(async (userCred) => {
    const token = await userCred.user.getIdToken();
    console.log("Firebase ID Token:", token);
    
  });
