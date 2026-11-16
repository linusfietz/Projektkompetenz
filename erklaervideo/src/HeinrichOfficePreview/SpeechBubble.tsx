import { useCurrentFrame } from "remotion";
import { ramp, smooth } from "./motion";
export const SpeechBubble = () => {
  const f = useCurrentFrame(),
    show = smooth(ramp(f, 92, 106));
  return (
    <div
      style={{
        position: "absolute",
        left: 1120,
        top: 247,
        width: 630,
        opacity: show,
        transform: `translateY(${(1 - show) * 14}px) scale(${0.96 + 0.04 * show})`,
        transformOrigin: "75% 100%",
      }}
    >
      <svg
        viewBox="0 0 630 230"
        width="630"
        height="230"
        style={{ filter: "drop-shadow(0 7px 5px #18304b18)" }}
      >
        <path
          d="M45 4 H584 Q625 4 625 45 V134 Q625 175 584 175 H520 L495 220 L482 175 H45 Q5 175 5 134 V45 Q5 4 45 4Z"
          fill="#fffefa"
          stroke="#19364f"
          strokeWidth="4"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 39,
          left: 25,
          right: 25,
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontWeight: 700,
          fontSize: 36,
          lineHeight: 1.3,
          color: "#19364f",
        }}
      >
        Liquidität bedeutet
        <br />
        Zahlungsfähigkeit!
      </div>
    </div>
  );
};
