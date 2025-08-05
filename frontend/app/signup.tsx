import { View, Text } from "react-native";
import SignUpForm from "../components/SignUpForm";

export default function SignUpScreen() {
  return (
    <>
      <View className="items-center justify-center bg-white">
        <Text className="text-black text-3xl font-semibold">Sign Up to Continue</Text>
      </View>
      <View className="flex-1 items-center justify-end bg-white">
        <SignUpForm />
      </View>
    </>
  );
}
