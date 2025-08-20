import { View, Text, Button, Alert } from "react-native";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "../components/icons/social/SocialIcons";
import SocialLoginButton from "../components/SocialLoginButton";
import SignUpForm from "../components/SignUpForm";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

// Replace this with your actual webClientId from google-services.json
const WEB_CLIENT_ID =
  "823838304957-v1b5g3nd18k1249qpd6vrtheq0a44632.apps.googleusercontent.com";

export default function SignUpScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  async function onEmailRegister(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      Alert.alert("Success", "Account created!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Alert.alert("Registration Error", errorMessage);
    }
  }

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
      <SafeAreaView className="flex-1 justify-around h-full bg-white">
        <View className="items-center justify-center bg-white">
          <Text className="text-black text-2xl font-semibold">
            Sign Up to Continue
          </Text>
          <View className="flex flex-row gap-6 mt-6">
            <SocialLoginButton
              className="bg-gray-100 p-3"
              icon={<AppleIcon size={28} />}
              onPress={onAppleButtonPress}
              size={28}
            />
            <SocialLoginButton
              className="bg-gray-100 p-3"
              icon={<GoogleIcon size={28} />}
              onPress={onGoogleButtonPress}
              size={28}
            />
            <SocialLoginButton
              className="bg-gray-100 p-3"
              icon={<FacebookIcon size={28} />}
              onPress={onFacebookButtonPress}
              size={28}
            />
          </View>
          <View className="flex flex-row w-5/6 items-center gap-3 mt-8">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="text-gray-800 text-lg font-bold">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>
        </View>
        <View className="items-center justify-end -mt-16 bg-white">
          <SignUpForm onRegister={onEmailRegister} />
        </View>
      </SafeAreaView>
    </>
  );
}
