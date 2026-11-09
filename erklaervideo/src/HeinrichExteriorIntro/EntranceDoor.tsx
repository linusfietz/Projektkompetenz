import React from "react";
import { staticFile } from "remotion";
import { REFERENCE_FILE } from "./ExteriorBackground";

/** Reuses the exact original door pixels. Closed = reference; open = hinged
 * leaves + a dark interior. The jambs and surrounding windows never move.
 */
export const EntranceDoor: React.FC<{ open: number }> = ({ open }) => {
  const leafWidth = 60 * (1 - open * 0.89);
  if (open <= 0) return null;
  return (
    <g>
      <defs>
        <clipPath id="door-opening">
          <path d="M591 531 L713 535 V674 L591 677Z" />
        </clipPath>
        <clipPath id="left-door-leaf">
          <rect x="591" y="531" width="60" height="146" />
        </clipPath>
        <clipPath id="right-door-leaf">
          <rect x="655" y="531" width="58" height="145" />
        </clipPath>
      </defs>
      <g clipPath="url(#door-opening)">
        <path d="M590 530 H714 V679 H590Z" fill="#173f54" />
        <path d="M593 536 H710 V674 H593Z" fill="#244e60" />
        <path d="M594 660 L710 658 V676 H594Z" fill="#63818b" />
        <g
          transform={`translate(591 0) scale(${leafWidth / 60} 1) translate(-591 0)`}
          clipPath="url(#left-door-leaf)"
        >
          <image href={staticFile(REFERENCE_FILE)} width="1672" height="941" />
        </g>
        <g
          transform={`translate(713 0) scale(${leafWidth / 60} 1) translate(-713 0)`}
          clipPath="url(#right-door-leaf)"
        >
          <image href={staticFile(REFERENCE_FILE)} width="1672" height="941" />
        </g>
      </g>
    </g>
  );
};
