import React from "react";
import Svg, { Path } from "react-native-svg";

export function ArrowsIcon({ size = 100, color = "#c41111" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 18" opacity={0.5}>
      <Path
        d="M12,9.06v3c0,.28-.22.5-.5.5h-6.73v2c0,.5-.6.75-.96.4L.16,10.96c-.22-.22-.22-.57,0-.79l3.65-4c.35-.35.96-.1.96.4v2h6.73c.28,0,.5.22.5.5ZM19.84,4.18L16.19.17c-.35-.35-.96-.1-.96.4v2h-6.73c-.28,0-.5.22-.5.5v3c0,.28.22.5.5.5h6.73v2c0,.5.6.75.96.4l3.65-3.98c.22-.22.22-.57,0-.79Z"
        fill={color}
      />
    </Svg>
  );
}