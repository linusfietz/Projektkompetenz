import { interpolate } from "remotion";

export const OFFICE = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 150,
};
export const ramp = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const smooth = (v: number) => v * v * (3 - 2 * v);
// Three 14-frame steps. During stance the foot moves opposite to the root
// at exactly the root's velocity: its world-space position stays fixed.
export const foot = (frame: number, offset: number) => {
  const t = Math.min(42, Math.max(0, frame - 30));
  const phase = ((t + offset) % 28) / 28;
  const x = phase < 0.5 ? -64 + 256 * phase : 64 - 256 * (phase - 0.5);
  const y = phase < 0.5 ? -36 * Math.sin(phase * 2 * Math.PI) : 0;
  return { x: -x, y };
};
