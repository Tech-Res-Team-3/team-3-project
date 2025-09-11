import React from "react";
import Svg, { Path } from "react-native-svg";

export function CalendarAltIcon({ size = 100, color = "#c6ad45" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" opacity={0.5}>
      <Path
        d="M17.06,2h-2.03v-1c0-.55-.45-1-1-1s-1,.45-1,1v1h-7v-1c0-.55-.45-1-1-1s-1,.45-1,1v1h-2.03c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h15.06c1.1,0,2-.9,2-2V4c0-1.1-.9-2-2-2ZM17.06,18H2v-8.5h15.06v8.5ZM17.06,7.5H2v-3.5h2.03v1c0,.55.45,1,1,1s1-.45,1-1v-1h7v1c0,.55.45,1,1,1s1-.45,1-1v-1h2.03v3.5ZM12.03,14.5h-5c-.55,0-1-.45-1-1h0c0-.55.45-1,1-1h5c.55,0,1,.45,1,1h0c0,.55-.45,1-1,1Z"
        fill={color}
      />
    </Svg>
  );
}
