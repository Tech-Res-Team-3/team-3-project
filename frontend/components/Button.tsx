import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  className = "",
  textClassName = "",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      className={`py-6 rounded-full items-center ${disabled ? "bg-ruby/20" : ""} ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-xl font-medium ${textClassName}`}>{title}</Text>
    </TouchableOpacity>
  );
};
