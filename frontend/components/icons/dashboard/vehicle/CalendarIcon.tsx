import React from "react";
import Svg, { Path } from "react-native-svg";

export function CalendarIcon({ size = 100, color = "#c41111" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" opacity={0.5}>
      <Path
        d="M0,7v-1c0-1.66,1.34-3,3-3h1V1c0-.55.45-1,1-1s1,.45,1,1v2h8V1c0-.55.45-1,1-1s1,.45,1,1v2h1c1.66,0,3,1.34,3,3v1H0ZM0,9v8c0,1.66,1.34,3,3,3h14c1.66,0,3-1.34,3-3v-8H0Z"
        fill={color}
      />
    </Svg>
  );
}
