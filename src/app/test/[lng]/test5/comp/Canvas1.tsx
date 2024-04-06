import { Canvas, useFrame } from "@react-three/fiber";

import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  ScrollControls,
  useScroll,
} from "@react-three/drei";

import { getProject, val } from "@theatre/core";

import stateTest3 from "./stateTest3.json";
import { editable as e, SheetProvider, useCurrentSheet } from "@theatre/r3f";

import { editable } from "@theatre/r3f";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef, useState } from "react";
import { MeshBasicMaterialParameters } from "three";
import useObjectStore_v6 from "../store/useObjectStore_v6";
import ThreeObject_e from "./ThreeObject_e";
const demoSheet = getProject("Demo Project").sheet("Demo Sheet");
const EditableCamera = editable(PerspectiveCamera, "perspectiveCamera");
interface ControllableBoxProps {
  onControlStart: () => void;
  onControlEnd: () => void;
}
const Canvas1 = ({
  threeCanvasRef,
  threeCameraRef,
  threeRendererRef,
  threeSceneRef,
  handleObjectChange,
}: any) => {
  const sheet = getProject("stateTest", { state: stateTest3 }).sheet(
    "stateTest3"
  );

  const boxRef = useRef<MeshBasicMaterialParameters | null>(null);

  const { objects, mode, target, addObject, selectObject, setMode } =
    useObjectStore_v6();
  const [selectedMode, setSelectedMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const onControlStart = () => {
    //console.log('onControlStart');
    setOrbitEnabled(false);
  };

  const onControlEnd = () => {
    //console.log('onControlEnd');
    setOrbitEnabled(true);
  };
  return (
    <Canvas
      ref={threeCanvasRef}
      onPointerMissed={() => {
        selectObject(null);
      }}
      camera={{
        position: [5, 5, -5],
        fov: 75,
      }}
    >
      <SheetProvider sheet={getProject("Demo Project").sheet("Demo Sheet")}>
        <ScrollControls pages={10} distance={0.01} damping={1}>
          <Scene handleObjectChange={handleObjectChange} boxRef={boxRef} />
        </ScrollControls>{" "}
      </SheetProvider>
    </Canvas>
  );
};

export default Canvas1;

const Scene = ({ handleObjectChange, boxRef }: any) => {
  const [hovered, setHover] = useState(false);
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [selectedMode, setSelectedMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");

  const { objects, mode, target, addObject, selectObject, setMode } =
    useObjectStore_v6();
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    if (sheet != undefined) {
      const sequenceLength = val(sheet.sequence.pointer.length);
      sheet.sequence.position = scroll.offset * sequenceLength;
    }
  });
  const onControlStart = () => {
    //console.log('onControlStart');
    setOrbitEnabled(false);
  };

  const onControlEnd = () => {
    //console.log('onControlEnd');
    setOrbitEnabled(true);
  };

  return (
    <>
      <e.ambientLight theatreKey="ambientLight" position={[10, 10, 10]} />
      <e.directionalLight
        theatreKey="directionalLight"
        position={[10, 10, 10]}
      />
      {objects.map((object: any, index: any) => {
        return (
          <group key={index}>
            <ThreeObject_e
              onControlEnd={onControlEnd}
              onControlStart={onControlStart}
              handleObjectChange={handleObjectChange}
              object={object}
              selectObject={selectObject}
              boxRef={boxRef}
              setHover={setHover}
              setSelectedMode={setSelectedMode}
            />
          </group>
        );
      })}
      <OrbitControls makeDefault />
      <gridHelper args={[20]} />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
          labelColor="white"
        />
      </GizmoHelper>
    </>
  );
};
