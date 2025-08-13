import React from "react";
import Svg, { Path } from "react-native-svg";

export function NotificationIcon({ size = 100, color = "#c41111" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" opacity={0.5}>
      <Path
        d="M8.84,18s3,0,3,0-1,2-3,2-3-2-3-2,3,0,3,0ZM17.09,14.63c-1.01-.83-2.24-2.85-2.24-3.63v-4c0-2.7-2.43-5.39-5.11-5.91-.12-.53-.36-1.09-.89-1.09s-.78.56-.89,1.09c-2.67.51-5.11,3.2-5.11,5.91v4c0,.78-1.23,2.8-2.24,3.63-.58.48-.79,1.33-.39,1.97.15.23.35.4.64.4h16c.29,0,.49-.16.64-.4.4-.64.19-1.49-.39-1.97Z"
        fill={color}
      />
    </Svg>
  );
}
