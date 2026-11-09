import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(
  readFileSync(
    new URL("../src/HeinrichExteriorIntro/motion.ts", import.meta.url),
    "utf8",
  ),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  },
).outputText;
const motionModule = { exports: {} };
new Function("require", "module", "exports", compiled)(
  require,
  motionModule,
  motionModule.exports,
);
const { exteriorMotion: motion, INTRO } = motionModule.exports;
assert.equal(INTRO.durationInFrames / INTRO.fps, 5);
assert.equal(motion(0).truckX, motion(15).truckX, "Truck waits half a second");
assert.ok(
  motion(120).truckX > 1672,
  "Entire truck is outside the frame by 4 seconds",
);
assert.equal(motion(0).doorOpen, 0);
assert.equal(motion(120).doorOpen, 1, "Door is open while entering");
assert.equal(motion(149).doorOpen, 0, "Door is closed at the end");
assert.equal(motion(149).entering, 1);
assert.ok(
  motion(112).personX > 591 && motion(112).personX < 713,
  "Person reaches the actual doorway",
);
for (let frame = 1; frame < 150; frame++) {
  const before = motion(frame - 1);
  const now = motion(frame);
  assert.deepEqual(now, motion(frame), "Frame evaluation is deterministic");
  assert.ok(now.truckX >= before.truckX, "Truck never reverses");
  assert.ok(now.truckX - before.truckX <= 5.61, "No truck position jumps");
  assert.ok(
    now.personScale <= before.personScale,
    "Perspective shrinks continuously",
  );
  assert.ok(
    Math.abs(now.personX - before.personX) < 7,
    "No person position jumps",
  );
  assert.ok(
    Math.abs(now.wheelDegrees - (((now.truckX - 1155) / 23) * 180) / Math.PI) <
      1e-9,
    "Wheel rotation matches distance",
  );
  if (now.entering > 0 && now.entering < 1)
    assert.equal(now.doorOpen, 1, "Door never closes on the person");
}
console.table(
  [0, 30, 60, 90, 120, 149].map((frame) => {
    const m = motion(frame);
    return {
      frame,
      truckX: m.truckX.toFixed(1),
      personX: m.personX.toFixed(1),
      personY: m.personY.toFixed(1),
      scale: m.personScale.toFixed(3),
      door: m.doorOpen,
      entered: m.entering.toFixed(2),
    };
  }),
);
console.log("Heinrich exterior motion checks passed.");
