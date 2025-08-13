import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  onPress?: () => void;
  size: number;
  className?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export default function DashboardMenuButton({
  icon,
  onPress,
  size = 24,
  className = "",
  accessibilityLabel,
  style,
}: Props) {
  return (
    <TouchableOpacity
      className={`w-[${size}] h-[${size}] rounded-full justify-center items-center ${className}`}
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.4}
    >
      {icon}
    </TouchableOpacity>
  );
}
