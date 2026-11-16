import { useCurrentFrame } from "remotion";
import { foot, ramp, smooth } from "./motion";

const ink = "#172e46",
  skin = "#edbd96";
const leg = (hip: number, x: number, y: number, back: boolean) => {
  const ankle = { x: hip + x, y: -12 + y };
  const dx = ankle.x - hip,
    dy = ankle.y + 195;
  const distance = Math.hypot(dx, dy);
  const bend = Math.sqrt(Math.max(0, 100 ** 2 - (distance / 2) ** 2));
  const knee = { x: hip + dx / 2 - bend, y: -195 + dy / 2 };
  return (
    <g>
      <path
        d={`M${hip} -195 Q${knee.x} ${knee.y} ${ankle.x} ${ankle.y}`}
        stroke={ink}
        strokeWidth="39"
        fill="none"
      />
      <path
        d={`M${hip} -195 Q${knee.x} ${knee.y} ${ankle.x} ${ankle.y}`}
        stroke={back ? "#b4a486" : "#d1c2a2"}
        strokeWidth="32"
        fill="none"
      />
      <path
        d={`M${ankle.x - 15} ${ankle.y - 3} Q${ankle.x - 28} ${ankle.y + 2} ${ankle.x - 29} ${ankle.y + 12} L${ankle.x + 17} ${ankle.y + 12} L${ankle.x + 16} ${ankle.y - 3}Z`}
        fill="#faf8f2"
        stroke={ink}
        strokeWidth="3"
      />
      <path
        d={`M${ankle.x - 25} ${ankle.y + 8} H${ankle.x + 15}`}
        stroke="#bdc8cf"
        strokeWidth="2"
      />
    </g>
  );
};

export const Employee = () => {
  const f = useCurrentFrame();
  const walk = ramp(f, 30, 72),
    turn = smooth(ramp(f, 75, 89));
  const x = 2020 - 384 * walk;
  const a = foot(f, 0),
    b = foot(f, 14);
  const walking = f >= 30 && f < 72;
  const bob = walking
    ? -3 * Math.cos(((f - 30) * Math.PI) / 7)
    : -1.1 * Math.sin(f / 10) * ramp(f, 87, 100);
  const gesture = smooth(ramp(f, 90, 105));
  const swing = walking ? Math.sin(((f - 30) * Math.PI) / 14) * 18 : 0;
  const blink = [83, 126].reduce(
    (v, c) => Math.max(v, Math.max(0, 1 - Math.abs(f - c) / 2)),
    0,
  );
  const speaking = f >= 99;
  const mouth = speaking ? 2 + 5 * Math.pow(Math.sin((f - 99) * 0.53), 2) : 0;
  const face = -12 * (1 - turn);
  return (
    <svg
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0 }}
      viewBox="0 0 1920 1080"
      aria-label="Junger Mitarbeiter erklärt Liquidität"
    >
      <g
        transform={`translate(${x} 936)`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cy="5" rx="73" ry="13" fill="#1c3655" opacity=".18" />
        {leg(20, b.x, b.y, true)}
        {leg(-20, a.x, a.y, false)}
        <g
          transform={`translate(0 ${bob}) scale(${0.86 + 0.14 * turn} 1)`}
          stroke={ink}
          strokeWidth="3.5"
        >
          <g transform={`rotate(${-swing} 38 -315)`}>
            <path d="M38 -317 Q65 -289 56 -246" fill="none" strokeWidth="29" />
            <path
              d="M38 -317 Q65 -289 56 -246"
              fill="none"
              stroke="#233f61"
              strokeWidth="22"
            />
            <path d="M56 -246 L53 -226" stroke={skin} strokeWidth="19" />
          </g>
          <path
            d="M-39 -327 Q0 -341 39 -327 L46 -205 Q0 -186 -46 -205Z"
            fill="#243f61"
          />
          <path d="M-42 -214 Q0 -203 43 -214" fill="none" stroke="#385473" />
          <path d="M-13 -355 L-13 -332 Q0 -318 15 -333 L15 -355" fill={skin} />
          <path
            d="M-21 -334 Q0 -314 22 -334"
            fill="none"
            stroke="#102b47"
            strokeWidth="7"
          />
          <g
            transform={`rotate(${swing * (1 - gesture) + gesture * (105 + 3 * Math.sin(f / 9))} -37 -316)`}
          >
            <path
              d="M-37 -316 Q-61 -289 -49 -262"
              fill="none"
              strokeWidth="30"
            />
            <path
              d="M-37 -316 Q-61 -289 -49 -262"
              fill="none"
              stroke="#2c496b"
              strokeWidth="23"
            />
            <g transform={`rotate(${gesture * 60} -49 -263)`}>
              <path d="M-49 -263 L-48 -239" stroke={skin} strokeWidth="18" />
              <path
                d="M-56 -242 Q-64 -232 -56 -223 Q-45 -215 -39 -226 L-38 -243 Q-40 -252 -45 -243 L-46 -250 Q-51 -255 -53 -246Z"
                fill={skin}
                strokeWidth="2.5"
              />
            </g>
          </g>
          <g transform={`translate(${face} 0)`}>
            <ellipse cx="-34" cy="-382" rx="9" ry="13" fill={skin} />
            <ellipse cx="34" cy="-382" rx="8" ry="13" fill={skin} />
            <path
              d="M-34 -410 Q-32 -441 4 -441 Q40 -436 35 -401 L31 -370 Q24 -347 4 -346 Q-23 -347 -31 -371Z"
              fill={skin}
            />
            <path
              d="M-35 -388 L-40 -414 Q-45 -438 -21 -446 Q-5 -458 17 -445 Q37 -450 43 -426 L34 -395 L26 -413 Q4 -405 -12 -424 Q-17 -408 -31 -407Z"
              fill="#66412e"
            />
            <path
              d="M-29 -432 Q-10 -446 9 -434"
              fill="none"
              stroke="#8a5b3c"
              strokeWidth="4"
            />
            <path
              d="M-23 -397 Q-16 -402 -9 -398 M11 -398 Q18 -402 25 -396"
              fill="none"
              stroke="#5c3b2c"
              strokeWidth="3"
            />
            {[-16, 18].map((eye) => (
              <g
                key={eye}
                transform={`translate(${eye} -386) scale(1 ${Math.max(0.08, 1 - blink)})`}
              >
                <ellipse rx="5.5" ry="7" fill="#fffaf0" strokeWidth="1.5" />
                <ellipse cx="-1" rx="2.6" ry="4" fill={ink} stroke="none" />
              </g>
            ))}
            <path
              d="M2 -389 L-1 -377 Q3 -374 8 -378"
              fill="none"
              stroke="#b87f61"
              strokeWidth="2"
            />
            {speaking ? (
              <ellipse
                cx="3"
                cy="-364"
                rx={11 - mouth * 0.2}
                ry={mouth}
                fill="#673d38"
                strokeWidth="2"
              />
            ) : (
              <path
                d={`M-9 -365 Q3 ${-360 + turn * 7} 16 -366`}
                fill={turn > 0.5 ? "#fff7e9" : "none"}
                strokeWidth="2.5"
              />
            )}
          </g>
        </g>
      </g>
    </svg>
  );
};
