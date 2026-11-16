import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";

/** Original pixels at a fixed camera. Leaf rectangles are replaced, never
 * overlaid with another plant. Subpixel sway is confined to these cutouts. */
export const OfficeBackground = () => {
  const f = useCurrentFrame();
  const image = staticFile("HeinrichKG_Buchhaltung.png");
  const patches = [
    { x: 596, y: 530, w: 72, h: 65, cx: 632, cy: 596 },
    { x: 804, y: 319, w: 98, h: 53, cx: 853, cy: 372 },
  ];
  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <mask id="office-base">
            <rect width="1920" height="1080" fill="white" />
            {patches.map((p, i) => (
              <rect
                key={i}
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                fill="black"
              />
            ))}
          </mask>
          {patches.map((p, i) => (
            <clipPath id={`leaf-${i}`} key={i}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} />
            </clipPath>
          ))}
        </defs>
        <image
          href={image}
          width="1920"
          height="1080"
          mask="url(#office-base)"
        />
        {patches.map((p, i) => (
          <g key={i} clipPath={`url(#leaf-${i})`}>
            <image
              href={image}
              width="1920"
              height="1080"
              transform={`rotate(${Math.sin(f / 23 + i) * 0.3} ${p.cx} ${p.cy})`}
            />
          </g>
        ))}
        <path
          d="M493 564 L575 564 L573 613 L491 613Z"
          fill="#81bce6"
          opacity={0.025 + 0.018 * Math.sin(f / 17)}
        />
        <path
          d="M502 581 H525 M502 589 H553 M502 597 H539"
          stroke="#a7cfe8"
          strokeWidth="2"
          opacity={0.055 + 0.035 * Math.sin(f / 12)}
        />
      </svg>
    </AbsoluteFill>
  );
};
