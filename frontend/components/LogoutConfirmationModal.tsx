import React from "react";
import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import { Button } from "./Button";

interface LogoutConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutConfirmationModal({
  visible,
  onConfirm,
  onCancel,
}: LogoutConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={onCancel}
      >
        <Pressable
          className="bg-white rounded-2xl p-6 mx-8 w-11/12"
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-xl font-semibold text-gray-800 text-center mb-4">
            Logout Confirmation
          </Text>

          <Text className="text-lg text-gray-600 text-center mb-6 leading-6">
            Are you sure you want to logout? You'll need to sign in again to
            access your account.
          </Text>

          <View className="flex-col gap-4">
            <Button
              title="Cancel"
              onPress={onCancel}
              className="py-6 bg-gray-200 w-full"
              textClassName="text-lg text-gray-700"
            />
            <Button
              title="Logout"
              onPress={onConfirm}
              className="py-6 bg-ruby w-full"
              textClassName="text-xl text-white"
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
