import { View, Text, Button, Alert } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";

// Replace this with your actual webClientId from google-services.json
const WEB_CLIENT_ID =
  "823838304957-v1b5g3nd18k1249qpd6vrtheq0a44632.apps.googleusercontent.com";

export default function SignUpScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();

      let idToken = signInResult.data?.idToken;
      if (!idToken) throw new Error("No ID token found");

      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(getAuth(), googleCredential);

      Alert.alert("Success", "Signed in with Google!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Alert.alert("Google Sign-In Error", errorMessage);
    }
  }

  return (
    <>
      <View className="items-center justify-center bg-white">
        <Text className="text-black text-3xl font-semibold">
          Sign Up to Continue
        </Text>
        <Button title="Sign Up with Google" onPress={onGoogleButtonPress} />
      </View>
      <View className="flex-1 items-center justify-end bg-white">
        <SignUpForm />
      </View>
    </>
  );
}
