import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ink = "#182e3b";
const enter = (frame: number, start: number, fps: number) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Original vector characters; every motion is derived from the current frame.
const Character: React.FC<{
  x: number;
  shirt: string;
  second?: boolean;
  relieved: boolean;
}> = ({ x, shirt, second = false, relieved }) => {
  const f = useCurrentFrame();
  const blink = f % 113 < 5;
  const bob = Math.sin(f / 13 + (second ? 2 : 0)) * 4;
  const arm = relieved ? Math.sin(f / 10) * 8 - 35 : Math.sin(f / 17) * 5 + 12;
  return (
    <svg
      width="390"
      height="560"
      viewBox="0 0 390 560"
      style={{
        position: "absolute",
        left: x,
        top: 420,
        transform: `translateY(${bob}px)`,
        overflow: "visible",
      }}
    >
      <ellipse cx="195" cy="535" rx="140" ry="17" fill={ink} opacity=".09" />
      <g
        stroke={ink}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M152 367 L142 493 L103 513 Q91 532 151 529 L181 388 M218 377 L240 505 L283 516 Q296 535 235 529 L199 390"
          fill="#263e50"
        />
        <path
          d="M121 234 Q190 207 259 234 L273 389 Q195 419 111 389Z"
          fill={shirt}
        />
        <path
          d="M128 250 Q91 288 86 340 L61 363"
          fill="none"
          stroke={shirt}
          strokeWidth="37"
        />
        <path
          d="M62 353 l-16 15 m17-11 l-2 24"
          fill="none"
          stroke="#efb58f"
          strokeWidth="16"
        />
        <g transform={`rotate(${arm} 250 252)`}>
          <path
            d="M249 250 L300 300 L327 238"
            fill="none"
            stroke={shirt}
            strokeWidth="35"
          />
          <path
            d="M327 239 l7-22 m-7 22 l-12-15"
            stroke="#efb58f"
            strokeWidth="15"
          />
        </g>
        <path d="M173 201 L173 237 Q195 255 216 234 L216 201" fill="#efb58f" />
        <ellipse cx="195" cy="135" rx="77" ry="87" fill="#fac7a1" />
        {second ? (
          <path
            d="M121 133 Q96 28 190 30 Q287 20 271 153 L248 118 L235 76 Q193 114 122 102Z"
            fill="#a44f39"
          />
        ) : (
          <path
            d="M120 118 Q101 49 155 48 Q172 13 211 46 Q276 30 272 115 L248 91 L224 81 Q171 111 120 96Z"
            fill={ink}
          />
        )}
        <path
          d={
            relieved
              ? "M153 123 l19-5 M214 118 l20 5"
              : "M153 119 l20 9 M215 128 l19-9"
          }
          fill="none"
          strokeWidth="5"
        />
        <path
          d={blink ? "M156 145 h14 M218 145 h14" : "M163 143 v8 M225 143 v8"}
          fill="none"
          strokeWidth="8"
        />
        <path d="M192 150 l-5 22 h12" fill="none" strokeWidth="4" />
        <path
          d={
            relieved ? "M171 184 Q195 208 218 183" : "M175 197 Q195 181 216 197"
          }
          fill="none"
          strokeWidth="5"
        />
        {second && (
          <g fill="none" strokeWidth="4">
            <rect x="143" y="130" width="38" height="31" rx="10" />
            <rect x="207" y="130" width="38" height="31" rx="10" />
            <path d="M181 141 h26" />
          </g>
        )}
      </g>
    </svg>
  );
};

const Bubble: React.FC<{
  text: string;
  x: number;
  start: number;
  end: number;
  color?: string;
}> = ({ text, x, start, end, color = "white" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < start || frame >= end) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 330,
        width: 480,
        padding: "28px 34px",
        background: color,
        border: `3px solid ${ink}`,
        borderRadius: 28,
        fontSize: 31,
        fontWeight: 700,
        lineHeight: 1.3,
        boxShadow: `6px 7px 0 ${ink}`,
        transform: `scale(${enter(frame, start, fps)})`,
        opacity: interpolate(frame, [end - 10, end], [1, 0], clamp),
      }}
    >
      {text}
      <div
        style={{
          position: "absolute",
          bottom: -18,
          left: 140,
          width: 28,
          height: 28,
          background: color,
          borderRight: `3px solid ${ink}`,
          borderBottom: `3px solid ${ink}`,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
};

const Bill: React.FC<{ label: string; amount: string; index: number }> = ({
  label,
  amount,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, 80 + index * 28, fps);
  const resolve = interpolate(
    frame,
    [415 + index * 12, 445 + index * 12],
    [0, 1],
    clamp,
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 758 + index * 38,
        top: 390 + index * 105,
        width: 300,
        padding: "24px 28px",
        background: "#fffdf6",
        border: `3px solid ${ink}`,
        borderRadius: 9,
        boxShadow: "9px 12px 0 #182e3b18",
        opacity: p,
        transform: `translateY(${(1 - p) * -340}px) rotate(${(index - 1) * 9 + Math.sin(frame / 22 + index) * (1 - resolve) * 3}deg) scale(${1 - resolve * 0.08})`,
      }}
    >
      <div
        style={{
          fontSize: 17,
          letterSpacing: 3,
          color: "#65757b",
          marginBottom: 15,
        }}
      >
        RECHNUNG 0{index + 1}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 40, fontWeight: 900, marginTop: 9 }}>
        {amount}
      </div>
      <div
        style={{
          height: 5,
          background: "#e6e6df",
          marginTop: 18,
          width: "80%",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -24,
          top: 30,
          padding: "8px 12px",
          background: resolve > 0.5 ? "#b9e5cd" : "#ffb5a3",
          border: `2px solid ${ink}`,
          fontSize: 16,
          fontWeight: 900,
          transform: "rotate(10deg)",
        }}
      >
        {resolve > 0.5 ? "IM PLAN ✓" : "FÄLLIG!"}
      </div>
    </div>
  );
};

export const CartoonDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relieved = frame >= 405;
  const titleIn = enter(frame, 8, fps);
  const ending = interpolate(frame, [475, 500], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        background: "#f5f0e4",
        color: ink,
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: "#e7e8d6",
          left: 420,
          top: 180,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 68,
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: 6,
        }}
      >
        GELD IM ALLTAG <span style={{ color: "#ad6047" }}> / 01</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 95,
          top: 62,
          border: `2px solid ${ink}`,
          borderRadius: 30,
          padding: "12px 22px",
          fontSize: 19,
        }}
      >
        EINE CARTOON-GESCHICHTE
      </div>
      <div
        style={{
          position: "absolute",
          top: 138,
          width: "100%",
          textAlign: "center",
          transform: `translateY(${(1 - titleIn) * 65}px) scale(${0.92 + titleIn * 0.08})`,
          opacity: titleIn,
        }}
      >
        <div style={{ fontSize: 91, fontWeight: 900, letterSpacing: -5 }}>
          {relieved ? "Ein Plan. Mehr Überblick." : "Zu viel Monat übrig?"}
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 9,
            background: relieved ? "#b9e5cd" : "#ffc46b",
            padding: "8px 25px",
            fontSize: 24,
            transform: `rotate(${Math.sin(frame / 40) * 1.2 - 1}deg)`,
          }}
        >
          {relieved
            ? "Gemeinsam den ersten Schritt machen."
            : "Wenn die Rechnungen schneller sind als das Gehalt."}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 907,
          width: "100%",
          height: 173,
          background: "#d8dcc9",
          borderTop: `3px solid ${ink}`,
        }}
      />
      <Character x={275} shirt="#df795d" relieved={relieved} />
      <Character x={1250} shirt="#72a9a5" second relieved={relieved} />
      <Bill label="Miete" amount="780 €" index={0} />
      <Bill label="Strom" amount="94 €" index={1} />
      <Bill label="Einkauf" amount="126 €" index={2} />
      <Bubble x={225} text="Schon wieder Rechnungen?!" start={65} end={175} />
      <Bubble
        x={1190}
        text="Und das Gehalt kommt erst nächste Woche …"
        start={180}
        end={290}
      />
      <Bubble
        x={225}
        text="Wie soll ich das alles bezahlen?"
        start={285}
        end={398}
      />
      <Bubble
        x={1190}
        text="Komm, wir machen einen Plan!"
        start={345}
        end={475}
        color="#d9efe4"
      />
      <div
        style={{
          position: "absolute",
          left: 95,
          bottom: 42,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        MILA & BEN{" "}
        <span style={{ fontWeight: 400 }}>
          {" "}
          /{" "}
          {relieved
            ? "Zusammen geht der erste Schritt leichter."
            : "Ein voller Briefkasten. Ein leeres Konto."}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 865,
          padding: "18px 30px",
          borderRadius: 20,
          background: ink,
          color: "white",
          fontSize: 26,
          fontWeight: 700,
          opacity: ending,
          transform: `translateY(${(1 - ending) * 50}px)`,
        }}
      >
        Sichten → Priorisieren → Hilfe holen
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 7,
          width: `${(frame / 599) * 100}%`,
          background: "#df795d",
        }}
      />
    </AbsoluteFill>
  );
};
