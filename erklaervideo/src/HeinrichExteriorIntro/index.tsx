import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ExteriorBackground } from "./ExteriorBackground";
import { EntranceDoor } from "./EntranceDoor";
import { Truck } from "./Truck";
import { WalkingCharacter } from "./WalkingCharacter";
import { ARTBOARD, exteriorMotion } from "./motion";

export const HeinrichExteriorIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const motion = exteriorMotion(frame);
  // The moving entry mask retracts the person through the doorway, rather than
  // dissolving them on the pavement. Full concealment is reached at frame 135.
  const concealY = 568 + motion.entering * 115;
  return (
    <AbsoluteFill style={{ backgroundColor: "#91c8ed" }}>
      <svg
        viewBox={`0 0 ${ARTBOARD.width} ${ARTBOARD.height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        role="img"
        aria-label="Heinrich KG – animierte Außenansicht"
      >
        <defs>
          <clipPath id="person-entry-mask">
            <path
              d={`M0 0 H1672 V941 H0Z M590 530 H714 V${concealY} H590Z`}
              clipRule="evenodd"
            />
          </clipPath>
        </defs>
        <ExteriorBackground />
        <EntranceDoor open={motion.doorOpen} />
        <Truck
          x={motion.truckX}
          y={motion.truckY}
          wheelDegrees={motion.wheelDegrees}
        />
        {frame < 135 ? (
          <g clipPath="url(#person-entry-mask)">
            <WalkingCharacter
              x={motion.personX}
              y={motion.personY}
              scale={motion.personScale}
              gait={motion.gait}
            />
          </g>
        ) : null}
      </svg>
    </AbsoluteFill>
  );
};
