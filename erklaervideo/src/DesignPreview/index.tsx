import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import {
  CharacterProps,
  enter,
  palette as c,
  Panel,
  PlaceholderCharacter,
  Reveal,
  SceneLabel,
  SpeechBubble,
  TopicIcon,
  typography,
} from "./design";

type PreviewProps = { Character?: React.ComponentType<CharacterProps> };
const Office: React.FC<PreviewProps> = ({
  Character = PlaceholderCharacter,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: c.light }}>
      <SceneLabel number="01" title="IM BÜRO" />
      <Reveal style={{ position: "absolute", left: 92, top: 184 }}>
        <div style={{ fontSize: 64, fontWeight: 800 }}>
          Die Rechnung ist da.
        </div>
        <div style={{ fontSize: 30, marginTop: 14 }}>
          Aber ist genug Geld verfügbar?
        </div>
      </Reveal>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <g
          stroke={c.navy}
          strokeWidth="6"
          strokeLinejoin="round"
          fill={c.white}
        >
          <rect x="1340" y="220" width="380" height="360" rx="18" />
          <path d="M1530 220 V580 M1340 400 H1720" />
          <path d="M88 890 H1832" fill="none" />
          <rect x="1430" y="744" width="180" height="146" fill={c.teal} />
          <path
            d="M1520 744 Q1410 627 1470 610 Q1536 621 1520 744 Q1521 609 1600 630 Q1628 674 1520 744"
            fill={c.teal}
          />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 340, top: 423 }}>
        <Character
          shirt={c.teal}
          reacting
          label="Platzhalterfigur A bemerkt die Rechnungen"
        />
      </div>
      <div style={{ position: "absolute", left: 1020, top: 423 }}>
        <Character
          shirt={c.orange}
          hair="angular"
          label="Platzhalterfigur B erklärt die Liquidität"
        />
      </div>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <g stroke={c.navy} strokeWidth="6" strokeLinejoin="round">
          <path d="M470 820 V964 M1260 820 V964" />
          <rect x="420" y="772" width="900" height="48" rx="12" fill={c.teal} />
          <path d="M760 772 V719 H940 V772" fill={c.navy} />
          <rect
            x="705"
            y="552"
            width="285"
            height="171"
            rx="15"
            fill={c.white}
          />
          <path d="M732 582 H961 M732 609 H870" />
          <g transform={`translate(0 ${-enter(frame, 55) * 10})`}>
            <rect
              x="1030"
              y="686"
              width="173"
              height="86"
              rx="8"
              fill={c.white}
            />
            <path d="M1052 709 H1176 M1052 731 H1120" />
            <circle cx="1180" cy="735" r="17" fill={c.orange} />
          </g>
        </g>
      </svg>
      <SpeechBubble at={60} left={220} top={324}>
        Offene Rechnungen?
        <br />
        <strong>Wie zahlen wir die?</strong>
      </SpeechBubble>
      <SpeechBubble at={155} left={1010} top={324} width={510}>
        Prüfen wir unsere
        <br />
        <strong>Liquidität!</strong>
      </SpeechBubble>
      <div style={{ position: "absolute", left: 94, bottom: 53, fontSize: 22 }}>
        ZWEI FIGUREN. EINE FRAGE.
      </div>
    </AbsoluteFill>
  );
};

const money = (value: number) =>
  `${Math.round(value).toLocaleString("de-DE")} €`;
const Liquidity: React.FC = () => {
  const frame = useCurrentFrame();
  const count = enter(frame, 70, 40);
  const result = Math.round(
    interpolate(frame, [155, 200], [0, 125], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <AbsoluteFill style={{ background: c.light }}>
      <SceneLabel number="02" title="DIE KENNZAHL" />
      <Reveal
        style={{
          position: "absolute",
          left: 90,
          top: 180,
          fontSize: 66,
          fontWeight: 800,
        }}
      >
        Liquidität 2. Grades
      </Reveal>
      <Reveal
        at={15}
        style={{ position: "absolute", left: 90, top: 278, fontSize: 29 }}
      >
        Decken Geld und kurzfristige Forderungen die kurzfristigen Schulden?
      </Reveal>
      <Reveal
        at={28}
        style={{ position: "absolute", left: 90, top: 360, width: 1120 }}
      >
        <Panel>
          <div
            style={{
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 25,
            }}
          >
            SO WIRD GERECHNET
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: 33,
              fontWeight: 700,
            }}
          >
            <div style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  borderBottom: `4px solid ${c.navy}`,
                  paddingBottom: 18,
                }}
              >
                Flüssige Mittel + kurzfristige Forderungen
              </div>
              <div style={{ paddingTop: 18 }}>
                Kurzfristige Verbindlichkeiten
              </div>
            </div>
            <div>× 100</div>
          </div>
          <Reveal
            at={70}
            style={{
              marginTop: 44,
              background: c.light,
              padding: "25px 20px",
              borderRadius: 16,
              fontSize: 34,
              textAlign: "center",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ({money(20000 * count)} + {money(30000 * count)}) / {money(40000)} ×
            100
          </Reveal>
        </Panel>
      </Reveal>
      <Reveal
        at={150}
        style={{ position: "absolute", left: 1250, top: 360, width: 580 }}
      >
        <Panel style={{ background: c.teal, height: 342 }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>UNSER BEISPIEL</div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              marginTop: 26,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {result} %
          </div>
          <div style={{ fontSize: 27, lineHeight: 1.4 }}>
            50.000 € decken
            <br />
            40.000 € kurzfristige Schulden.
          </div>
        </Panel>
      </Reveal>
      <Reveal
        at={210}
        style={{
          position: "absolute",
          left: 94,
          top: 850,
          width: 1700,
          fontSize: 29,
          lineHeight: 1.5,
        }}
      >
        <strong>125 % = rechnerische Deckung zum Stichtag.</strong>
        <br />
        Forderungen sind noch kein Geld auf dem Konto – Zahlungseingänge und
        Fälligkeiten beachten.
      </Reveal>
    </AbsoluteFill>
  );
};

const Chapter: React.FC = () => (
  <AbsoluteFill style={{ background: c.navy, color: c.white }}>
    <SceneLabel number="03" title="DER ÜBERBLICK" dark />
    <Reveal style={{ position: "absolute", left: 100, top: 211 }}>
      <div
        style={{ width: 90, height: 8, background: c.orange, marginBottom: 35 }}
      />
      <div
        style={{
          fontSize: 31,
          color: c.teal,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Lernfeld 9
      </div>
      <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.13 }}>
        Lernfeld 9 – Liquidität
        <br />
        und Finanzierung
      </div>
    </Reveal>
    <div
      style={{
        position: "absolute",
        left: 100,
        right: 100,
        top: 605,
        display: "flex",
        gap: 30,
      }}
    >
      {(
        [
          { title: "Liquidität", text: "Zahlungsfähig bleiben", kind: "cash" },
          {
            title: "Rechtsformen",
            text: "Unternehmen gestalten",
            kind: "legal",
          },
          {
            title: "Finanzierung",
            text: "Kapital beschaffen",
            kind: "finance",
          },
        ] as const
      ).map((topic, i) => (
        <Reveal key={topic.title} at={75 + i * 30} style={{ flex: 1 }}>
          <Panel style={{ height: 252, color: c.navy }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TopicIcon kind={topic.kind} />
              <span style={{ fontSize: 23, fontWeight: 700 }}>0{i + 1}</span>
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, marginTop: 22 }}>
              {topic.title}
            </div>
            <div style={{ fontSize: 26, marginTop: 12 }}>{topic.text}</div>
          </Panel>
        </Reveal>
      ))}
    </div>
  </AbsoluteFill>
);

export const DesignPreview: React.FC<PreviewProps> = ({ Character }) => (
  <AbsoluteFill style={typography}>
    <Sequence durationInFrames={300}>
      <Office Character={Character} />
    </Sequence>
    <Sequence from={300} durationInFrames={300}>
      <Liquidity />
    </Sequence>
    <Sequence from={600} durationInFrames={300}>
      <Chapter />
    </Sequence>
  </AbsoluteFill>
);
