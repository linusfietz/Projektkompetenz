import React from "react";

/** A simple self-drawn figure, viewed from behind towards the entrance.
 * Feet are the origin, so perspective scaling cannot move the ground contact.
 */
export const WalkingCharacter: React.FC<{
  x: number;
  y: number;
  scale: number;
  gait: number;
}> = ({ x, y, scale, gait }) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    aria-label="Eine Figur geht zum Haupteingang"
  >
    <ellipse cx="0" cy="0" rx="29" ry="7" fill="#263252" opacity="0.22" />
    <g
      stroke="#14334d"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform={`rotate(${gait * 22} -12 -55)`}>
        <path d="M-12 -55 L-13 -26 L-17 -5" fill="none" strokeWidth="12" />
        <path d="M-17 -5 H-31" strokeWidth="8" />
      </g>
      <g transform={`rotate(${-gait * 22} 12 -55)`}>
        <path d="M12 -55 L13 -26 L17 -5" fill="none" strokeWidth="12" />
        <path d="M17 -5 H4" strokeWidth="8" />
      </g>
      <g transform={`rotate(${-gait * 26} -23 -105)`}>
        <path
          d="M-23 -105 L-31 -78 L-26 -60"
          fill="none"
          stroke="#ffac51"
          strokeWidth="10"
        />
        <path d="M-26 -63 L-26 -59" stroke="#f6d1a6" strokeWidth="10" />
      </g>
      <g transform={`rotate(${gait * 26} 23 -105)`}>
        <path
          d="M23 -105 L31 -78 L26 -60"
          fill="none"
          stroke="#ffac51"
          strokeWidth="10"
        />
        <path d="M26 -63 L26 -59" stroke="#f6d1a6" strokeWidth="10" />
      </g>
      <path d="M-24 -111 Q0 -123 24 -111 L23 -55 H-23Z" fill="#ff981f" />
      <path d="M-7 -125 V-113 Q0 -107 7 -113 V-125" fill="#f6d1a6" />
      <rect x="-19" y="-163" width="38" height="43" rx="17" fill="#f6d1a6" />
      <path
        d="M-19 -138 V-151 Q-20 -172 2 -171 Q24 -170 20 -148 L16 -132 L9 -143 L-9 -140 L-16 -132Z"
        fill="#17364e"
      />
      <path
        d="M-13 -100 Q0 -108 13 -100 V-69 Q0 -63 -13 -69Z"
        fill="#167f98"
        strokeWidth="3"
      />
    </g>
  </g>
);
