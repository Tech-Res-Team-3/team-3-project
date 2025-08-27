import React from "react";
import Svg, { Path } from "react-native-svg";

export function PerformanceIcon({ size = 100, color = "#c41111" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 15" opacity={0.5}>
      <Path
        d="M19.99.5v5.5c0,.55-.45,1-1,1s-1-.45-1-1v-2.59l-6.65,6.65c-.2.2-.51.2-.71,0l-3.29-3.29c-.2-.2-.51-.2-.71,0L1.7,11.7c-.44.39-1.03.53-1.48.13-.39-.39-.23-1.25.16-1.64L6.64,3.94c.2-.2.51-.2.71,0l3.29,3.29c.2.2.51.2.71,0l5.23-5.23h-2.59c-.55,0-1-.45-1-1s.45-1,1-1h5.5c.28,0,.5.22.5.5Z"
        fill={color}
      />
    </Svg>
  );
}