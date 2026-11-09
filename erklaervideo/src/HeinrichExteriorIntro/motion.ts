import { interpolate } from "remotion";

export const INTRO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 150,
} as const;
// Author all artwork in the original image's coordinate system.
export const ARTBOARD = { width: 1672, height: 941 } as const;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const exteriorMotion = (frame: number) => {
  // A short acceleration joins constant velocity continuously at frame 25.
  const elapsed = Math.max(0, Math.min(frame, 120) - 15);
  const distance =
    elapsed < 10 ? 0.28 * elapsed * elapsed : 28 + (elapsed - 10) * 5.6;
  const walkProgress = interpolate(frame, [0, 112], [0, 1], clamp);
  const entering = interpolate(frame, [119, 135], [0, 1], clamp);
  return {
    truckX: 1155 + distance,
    truckY: 490,
    wheelDegrees: ((distance / 23) * 180) / Math.PI,
    personX:
      interpolate(walkProgress, [0, 0.7, 1], [1240, 835, 647], clamp) -
      entering * 15,
    personY:
      interpolate(walkProgress, [0, 0.7, 1], [870, 744, 676], clamp) -
      entering * 8,
    personScale:
      interpolate(walkProgress, [0, 1], [1, 0.55], clamp) *
      (1 - entering * 0.12),
    gait:
      Math.sin((Math.min(frame, 112) * Math.PI * 2) / 22) *
      interpolate(frame, [0, 102, 112], [1, 1, 0], clamp),
    // Pause at the threshold while the door opens; enter only once fully open.
    doorOpen: interpolate(frame, [105, 119, 135, 147], [0, 1, 1, 0], clamp),
    entering,
  };
};
