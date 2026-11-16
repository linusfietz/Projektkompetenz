import { AbsoluteFill } from "remotion";
import { OfficeBackground } from "./OfficeBackground";
import { Employee } from "./Employee";
import { SpeechBubble } from "./SpeechBubble";
export const HeinrichOfficePreview = () => (
  <AbsoluteFill style={{ backgroundColor: "#c0cadc" }}>
    <OfficeBackground />
    <Employee />
    <SpeechBubble />
  </AbsoluteFill>
);
