import { View, Text, Alert } from "react-native";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "../components/icons/social/SocialIcons";
import SocialLoginButton from "../components/SocialLoginButton";
import LogInForm from "../components/LogInForm";
import React, { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useLoadingStore } from "../stores/loadingStore";
import GlobalLoading from "../components/GlobalLoading";

// Replace this with your actual webClientId from google-services.json
const WEB_CLIENT_ID =
  "823838304957-v1b5g3nd18k1249qpd6vrtheq0a44632.apps.googleusercontent.com";

export default function LogInScreen() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    useLoadingStore.getState().setLoading(true);
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });

    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        router.replace("/(app)");
      } else {
        setCheckingAuth(false);
        useLoadingStore.getState().setLoading(false);
      }
    });

    return unsubscribe;
  }, [router]);

  async function onEmailLogin(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      Alert.alert("Success", "Logged in!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Alert.alert("Login Error", errorMessage);
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
      <GlobalLoading />
      <View className="flex-1 justify-center h-full bg-white gap-10">
        <View className="items-center justify-center bg-white pt-8">
          <Text className="text-black text-2xl font-semibold">
            Login to Continue
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
        <View className="items-center justify-end bg-white pt-10">
          <LogInForm onLogin={onEmailLogin} />
        </View>
      </View>
    </>
  );
}
