import React, { useState } from "react";
import { Alert, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

type SignUpFormProps = {
  onRegister?: (email: string, password: string) => Promise<void>;
};

export default function SignUpForm({ onRegister }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    if (!agreed) {
      Alert.alert("Error", "You must agree to the terms and conditions.");
      return;
    }
    if (onRegister) {
      await onRegister(email, password);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreed(false);
    }
  };

  return (
    <View className="w-full mx-auto bg-white">
      <View className="justify-center px-5">
        <View className="mb-3">
          <Text className="mb-2 text-lg font-semibold text-gray-400">Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-4"
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#d1d5db"
            autoCapitalize="words"
          />
        </View>
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
        <View className="mb-3">
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
        <View className="mb-3">
          <Text className="mb-2 text-lg font-semibold text-gray-400">
            Confirm Password
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-4"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            placeholderTextColor="#d1d5db"
            secureTextEntry
          />
        </View>
        <View className="flex-row items-center mb-6 mt-1">
          <TouchableOpacity
            className={`w-5 h-5 border rounded mr-2 ${agreed ? "bg-ruby border-ruby" : "border-gray-400"}`}
            onPress={() => setAgreed((prev) => !prev)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
          >
            {agreed && (
              <FontAwesome
                name="check"
                size={12}
                color="#fff"
                style={{ alignSelf: "center", marginTop: 1 }}
              />
            )}
          </TouchableOpacity>
          <Text className="text-lg">
            I agree to <Text className="text-ruby">terms and conditions</Text>
          </Text>
        </View>
      </View>

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        disabled={!agreed}
        className="bg-ruby self-center w-11/12"
        textClassName="text-white"
      />
      <Text className="text-xl font-semibold self-center pt-4">
        Already have an account?
      </Text>
      <Link href="/login" replace asChild>
        <Text className="text-ruby text-lg font-bold self-center">
          Login
        </Text>
      </Link>
    </View>
  );
}
