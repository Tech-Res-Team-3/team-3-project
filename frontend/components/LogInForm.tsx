import React, { useState } from "react";
import { Alert, View, Text, TextInput } from "react-native";
import { Link } from "expo-router";
import { Button } from "./Button";

type LogInFormProps = {
  onLogin?: (email: string, password: string) => Promise<void>;
  onSignUpPress?: () => void;
};

export default function LogInForm({ onLogin, onSignUpPress }: LogInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (onLogin) {
      await onLogin(email, password);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View className="w-full mx-auto bg-white">
      <View className="justify-center px-5 pb-16">
        <View className="mb-3">
          <Text className="mb-2 text-lg font-semibold text-gray-400">
            Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-4"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#d1d5db"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray-400">
            Password
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-4"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#d1d5db"
            secureTextEntry
          />
        </View>
        <Text className="self-end text-gray-400 text-lg font-semibold">
          Forgot Password?
        </Text>
      </View>

      <Button
        title="Login"
        onPress={handleLogIn}
        className="bg-ruby self-center"
        textClassName="text-white"
      />
      <View className="pt-20">
        <Text className="text-xl font-semibold self-center pt-4">
          Don't have an account?
        </Text>
        <Link href="/signup" replace asChild>
          <Text className="text-ruby text-lg font-bold self-center">
            Sign Up
          </Text>
        </Link>
      </View>
    </View>
  );
}
