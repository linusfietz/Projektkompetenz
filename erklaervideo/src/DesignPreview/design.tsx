import React, { CSSProperties } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const palette = {
  navy: "#0F2E57",
  teal: "#16B7B1",
  white: "#FFFFFF",
  orange: "#FF8A00",
  light: "#E6F3FF",
};
export const typography = {
  fontFamily: "Arial, Helvetica, sans-serif",
  color: palette.navy,
};
export const enter = (frame: number, start = 0, duration = 24) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const Reveal: React.FC<
  React.PropsWithChildren<{ at?: number; style?: CSSProperties }>
> = ({ at = 0, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - at,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  return (
    <div
      style={{
        opacity: enter(frame, at, 18),
        transform: `translateY(${(1 - progress) * 26}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Panel: React.FC<
  React.PropsWithChildren<{ style?: CSSProperties }>
> = ({ children, style }) => (
  <div
    style={{
      background: palette.white,
      border: `4px solid ${palette.navy}`,
      borderRadius: 28,
      padding: 38,
      ...style,
    }}
  >
    {children}
  </div>
);

export const SceneLabel: React.FC<{
  number: string;
  title: string;
  dark?: boolean;
}> = ({ number, title, dark }) => (
  <div
    style={{
      position: "absolute",
      top: 64,
      left: 88,
      right: 88,
      display: "flex",
      alignItems: "center",
      gap: 22,
      color: dark ? palette.white : palette.navy,
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 2,
    }}
  >
    <span
      style={{
        background: palette.teal,
        color: palette.navy,
        padding: "12px 18px",
        borderRadius: 12,
      }}
    >
      {number}
    </span>
    {title}
    <span style={{ marginLeft: "auto", fontSize: 20 }}>
      LF 09 / DESIGNPREVIEW
    </span>
  </div>
);

export const SpeechBubble: React.FC<
  React.PropsWithChildren<{
    at: number;
    left: number;
    top: number;
    width?: number;
  }>
> = ({ at, left, top, width = 450, children }) => (
  <Reveal at={at} style={{ position: "absolute", left, top, width }}>
    <Panel
      style={{
        fontSize: 32,
        lineHeight: 1.3,
        padding: "24px 30px",
        position: "relative",
      }}
    >
      {children}
      <svg
        width="45"
        height="32"
        style={{ position: "absolute", left: 50, bottom: -30 }}
      >
        <path
          d="M2 0 L2 27 L39 0"
          fill={palette.white}
          stroke={palette.navy}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </Panel>
  </Reveal>
);

export type CharacterProps = {
  shirt: string;
  hair?: "round" | "angular";
  reacting?: boolean;
  label: string;
};
// Replace this component (or pass a different one to DesignPreview) for final characters.
export const PlaceholderCharacter: React.FC<CharacterProps> = ({
  shirt,
  hair = "round",
  reacting = false,
  label,
}) => {
  const frame = useCurrentFrame();
  const reaction = enter(frame, 65, 24);
  const lift = reacting ? reaction * 12 : 0;
  return (
    <svg
      viewBox="0 0 300 480"
      width="300"
      height="480"
      role="img"
      aria-label={label}
      style={{ transform: `translateY(${-lift}px)` }}
    >
      <g
        stroke={palette.navy}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M110 334 L104 448 L65 448 M190 334 L196 448 L235 448"
          fill="none"
        />
        <path d="M88 208 Q150 176 212 208 L226 340 L74 340 Z" fill={shirt} />
        <path
          d="M88 222 L48 298 L87 314 M212 222 L254 280 L278 240"
          fill="none"
        />
        <rect
          x="130"
          y="162"
          width="40"
          height="42"
          rx="12"
          fill={palette.white}
        />
        <rect
          x="89"
          y="45"
          width="122"
          height="132"
          rx="49"
          fill={palette.white}
        />
        {hair === "round" ? (
          <path
            d="M89 100 Q67 21 143 27 Q224 20 211 94 L180 64 L144 84 L119 67 Z"
            fill={palette.navy}
          />
        ) : (
          <path
            d="M89 90 L89 42 L197 29 L214 82 L158 62 Z"
            fill={palette.navy}
          />
        )}
        <path
          d={`M117 ${112 - lift / 3} L129 ${112 - lift / 3} M172 ${112 - lift / 3} L184 ${112 - lift / 3}`}
          fill="none"
        />
        {reacting && reaction > 0.5 ? (
          <ellipse cx="151" cy="145" rx="9" ry="12" fill={palette.navy} />
        ) : (
          <path d="M137 142 Q151 153 165 142" fill="none" />
        )}
      </g>
    </svg>
  );
};

export const TopicIcon: React.FC<{
  kind: "cash" | "legal" | "finance";
  size?: number;
}> = ({ kind, size = 90 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke={palette.navy}
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {kind === "cash" ? (
      <>
        <rect x="10" y="25" width="80" height="50" rx="9" fill={palette.teal} />
        <circle cx="50" cy="50" r="14" fill={palette.white} />
        <path d="M23 49 H25 M75 49 H77" />
      </>
    ) : kind === "legal" ? (
      <>
        <path d="M50 15 V85 M20 85 H80 M15 30 H85 M26 30 L10 60 H42 Z M74 30 L58 60 H90 Z" />
        <circle cx="50" cy="20" r="7" fill={palette.orange} />
      </>
    ) : (
      <>
        <path
          d="M15 85 H88 M25 85 V60 H40 V85 M48 85 V43 H63 V85 M71 85 V24 H86 V85"
          fill={palette.teal}
        />
        <path d="M15 43 L69 13 M53 13 H69 V29" />
      </>
    )}
  </svg>
);
