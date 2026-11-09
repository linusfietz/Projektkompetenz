import React from "react";

const ink = "#102f4b";
const Wheel: React.FC<{ x: number; rotation: number }> = ({ x, rotation }) => (
  <g transform={`translate(${x} 165)`}>
    <ellipse rx="21" ry="26" fill="#202735" stroke={ink} strokeWidth="3" />
    <g transform={`rotate(${rotation})`}>
      <circle r="12" fill="#8996a7" stroke={ink} strokeWidth="3" />
      <path d="M-9 0 H9 M0 -9 V9" stroke="#dbe4ec" strokeWidth="3" />
      <circle r="3" fill={ink} />
    </g>
  </g>
);

/** Original SVG artwork; local coordinates and wheel radius stay fixed. */
export const Truck: React.FC<{
  x: number;
  y: number;
  wheelDegrees: number;
}> = ({ x, y, wheelDegrees }) => (
  <g transform={`translate(${x} ${y})`} aria-label="Ein LKW fährt nach rechts">
    <ellipse cx="147" cy="186" rx="155" ry="9" fill="#263252" opacity="0.21" />
    <g stroke={ink} strokeWidth="3" strokeLinejoin="round">
      <path d="M17 124 H256 V158 H17Z" fill="#34485b" />
      <path d="M8 10 L158 0 L184 14 V134 L8 134Z" fill="#f0f1f7" />
      <path d="M158 0 L184 14 V134 L158 123Z" fill="#c9cfde" />
      <path
        d="M17 20 L148 11 V121 H17Z"
        fill="#e2e5ef"
        stroke="#aab7c9"
        strokeWidth="2"
      />
      <path
        d="M184 39 Q184 26 197 26 H229 Q239 26 245 39 L272 90 V151 H184Z"
        fill="#f7f8fb"
      />
      <path d="M201 40 H227 L247 83 H201Z" fill="#8cc7e7" />
      <path d="M203 42 L224 42 L239 75Z" fill="#cceafa" stroke="none" />
      <path
        d="M199 94 H245 V143 H199Z"
        fill="#e6e9f0"
        stroke="#b0bbc9"
        strokeWidth="2"
      />
      <path d="M211 104 H221" fill="none" strokeWidth="4" />
      <rect x="189" y="67" width="12" height="31" rx="3" fill="#355570" />
      <path d="M248 101 H272 V117 H250Z" fill="#ffae37" />
      <path d="M252 127 H272 M253 134 H272" fill="none" />
      <path d="M263 146 H281 V157 H263Z" fill="#c8d3dd" />
      <path
        d="M39 156 Q40 126 61 126 Q86 126 88 156 M211 156 Q212 126 234 126 Q257 126 258 156"
        fill="#243747"
      />
      <rect x="7" y="137" width="10" height="10" fill="#ff8a00" />
    </g>
    <Wheel x={63} rotation={wheelDegrees} />
    <Wheel x={235} rotation={wheelDegrees} />
  </g>
);
