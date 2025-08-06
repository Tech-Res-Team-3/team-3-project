import { View, Text, Button, Alert } from "react-native";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "../components/icons/SocialIcons";
import SocialLoginButton from "../components/SocialLoginButton";
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

  async function onAppleButtonPress() {
    /* Apple Sign-In Logic */
  }

  async function onFacebookButtonPress() {
    /* Facebook Sign-In Logic */
  }

  return (
    <>
      <View className="items-center justify-center bg-white">
        <Text className="text-black text-3xl font-semibold mt-20">
          Sign Up to Continue
        </Text>
        <View className="flex flex-row gap-6 mt-6">
          <SocialLoginButton
            className="bg-gray-100 p-3"
            icon={<AppleIcon size={36} />}
            onPress={onAppleButtonPress}
            size={36}
          />
          <SocialLoginButton
            className="bg-gray-100 p-3"
            icon={<GoogleIcon size={36} />}
            onPress={onGoogleButtonPress}
            size={36}
          />
          <SocialLoginButton
            className="bg-gray-100 p-3"
            icon={<FacebookIcon size={36} />}
            onPress={onFacebookButtonPress}
            size={36}
          />
        </View>
        <View className="flex flex-row w-5/6 items-center gap-3 mt-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="text-gray-800 text-xl font-semibold">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>
      </View>
      <View className="flex-1 items-center justify-end bg-white">
        <SignUpForm />
      </View>
    </>
  );
}
