import { TouchableOpacity } from "react-native";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  onPress: () => void;
  size: number;
  className?: string;
  accessibilityLabel?: string;
};

export default function SocialLoginButton({
  icon,
  onPress,
  size = 24,
  className = "",
  accessibilityLabel,
}: Props) {
  return (
    <TouchableOpacity
      className={`w-[${size}] h-[${size}] rounded-full justify-center items-center ${className}`}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.8}
    >
      {icon}
    </TouchableOpacity>
  );
}
