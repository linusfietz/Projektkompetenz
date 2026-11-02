import { Composition } from "remotion";
import { CartoonDemo } from "./CartoonDemo";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="CartoonDemo"
        component={CartoonDemo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
