import React from "react";
import Svg, { Path } from "react-native-svg";

export function ClockSmallIcon({ size = 100, color = "#c6ad45" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" opacity={0.5}>
      <Path
        d="M10,0C4.48,0,0,4.48,0,10s4.48,10,10,10,10-4.48,10-10S15.52,0,10,0ZM10,18c-4.41,0-8-3.59-8-8S5.59,2,10,2s8,3.59,8,8-3.59,8-8,8ZM14,14c-.2.2-.45.29-.7.29s-.52-.09-.71-.29l-2.12-2.12-1.47-1.47v-5.91c0-.55.45-1,1-1s1,.45,1,1v5.09l3,3c.39.39.39,1.02,0,1.41Z"
        fill={color}
      />
    </Svg>
  );
}
