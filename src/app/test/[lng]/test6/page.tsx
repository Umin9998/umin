"use client";

import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import demoProjectState from "./state.json";

studio.initialize();
studio.extend(extension);

const demoSheet = getProject("Demo Project", { state: demoProjectState }).sheet(
  "Demo Sheet"
);

const Page = () => {
  useEffect(() => {
    demoSheet.project.ready.then(() =>
      demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    );
  }, []);
  return (
    <>
      test
      <Canvas style={{ height: "50vh", border: `1px solid #0ff` }}>
        <SheetProvider sheet={demoSheet}>
          <perspectiveCamera position={[5, 5, -5]} fov={75} />
          <ambientLight />
          <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
          <e.mesh theatreKey="Cube">
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </e.mesh>
        </SheetProvider>
      </Canvas>
    </>
  );
};

export default Page;
