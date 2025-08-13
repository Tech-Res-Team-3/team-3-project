import React from "react";
import Svg, { Path } from "react-native-svg";

export function CreditCardIcon({ size = 100, color = "#c41111" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" opacity={0.5}>
      <Path
        d="M0,3V1C0,.45.45,0,1,0h18c.55,0,1,.45,1,1v2H0ZM20,5v8c0,.55-.45,1-1,1H1c-.55,0-1-.45-1-1V5h20ZM8,10H3v1h5v-1ZM12,8H3v1h9v-1Z"
        fill={color}
      />
    </Svg>
  );
}
