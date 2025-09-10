import React from "react";
import Svg, { Path } from "react-native-svg";

export function LocationIcon({ size = 100, color = "#c41111" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" opacity={0.5}>
      <Path
        d="M8,0C3.58,0,0,3.58,0,8c0,6,7,12,8,12s8-6,8-12C16,3.58,12.42,0,8,0ZM8,12c-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4-1.79,4-4,4Z"
        fill={color}
      />
    </Svg>
  );
}