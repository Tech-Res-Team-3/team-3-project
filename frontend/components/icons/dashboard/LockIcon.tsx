import React from "react";
import Svg, { Path } from "react-native-svg";

export function LockIcon({ size = 100, color = "#c41111" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" opacity={0.5}>
      <Path
        d="M14.5,7h-1.5v-2c0-3-2-5-5-5S3,2,3,5v2h-1.5c-.83,0-1.5.67-1.5,1.5v10c0,.83.67,1.5,1.5,1.5h13c.83,0,1.5-.67,1.5-1.5v-10c0-.83-.67-1.5-1.5-1.5ZM4.5,5c0-2.16,1.34-3.5,3.5-3.5s3.5,1.34,3.5,3.5v2h-7v-2ZM9,13.72v2.78c0,.28-.22.5-.5.5h-1c-.28,0-.5-.22-.5-.5v-2.78c-.6-.35-1-.98-1-1.72,0-1.1.9-2,2-2s2,.9,2,2c0,.74-.4,1.38-1,1.72Z"
        fill={color}
      />
    </Svg>
  );
}

