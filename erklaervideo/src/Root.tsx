import { HeinrichExteriorIntro } from "./HeinrichExteriorIntro";
import { INTRO } from "./HeinrichExteriorIntro/motion";
import { Composition } from "remotion";
import { DesignPreview } from "./DesignPreview";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="HeinrichExteriorIntro"
        component={HeinrichExteriorIntro}
        {...INTRO}
      />
      <Composition
        id="DesignPreview"
        component={DesignPreview}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={900}
      />
    </>
  );
};
