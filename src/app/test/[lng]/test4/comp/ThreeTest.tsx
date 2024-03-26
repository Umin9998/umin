import { StrictMode, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Stats, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
// https://github.com/pmndrs/leva
// https://github.com/pmndrs/leva/blob/main/docs/inputs.md
import { Leva, useControls } from "leva";

import styled from "styled-components";
import Polyhedron2 from "../../test3/comp/Polyhedron2";
import useKeyboard from "../../test3/customs/useKeyboard";

const ThreeTest = () => {
  const keyMap = useKeyboard();

  // Instead of using useMemo to cache our objects in the components for re-use, we can move the instances into the parent component, and then pass them down by reference.
  // This will also allow us to re-use the same instances in the child components unless the Page component does not re-renders, rather than creating new copies of each.
  // const polyhedron = [
  //   new THREE.BoxGeometry(),
  //   new THREE.SphereGeometry(0.785398),
  //   new THREE.DodecahedronGeometry(0.785398)
  // ];

  const polyhedron = useMemo(
    () => [
      new THREE.BoxGeometry(),
      new THREE.SphereGeometry(0.785398),
      new THREE.DodecahedronGeometry(0.785398),
    ],
    []
  );

  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      //color: { value: 'lime' }
      color: { value: "#f00", onChange: (v: any) => {}, transient: false },
    };
  }, []);

  // https://github.com/pmndrs/leva/blob/main/docs/getting-started.md#folders
  const pA = useControls("Polyhedron A", options as any);
  const pB = useControls("Polyhedron B", options as any);

  return (
    <>
      {" "}
      (
      <Container className="flex justify-center items-center h-screen">
        {/* <div>
        Hey {name}, hello! {aNumber}
      </div> */}
        {/* <RefTest /> */}
        <Canvas
          camera={{ position: [5, 5, 10] }}
          // frameloop="demand"
          className="h-2xl w-2xl"
        >
          {/* <BoxTest position={[-0.75, 0, 0]} name="A" />
        <BoxTest position={[0.75, 0, 0]} name="B" /> */}

          <Polyhedron2
            keyMap={keyMap}
            name="meshNormalMaterial"
            position={[1, 0.5, 0]}
            material={new THREE.MeshNormalMaterial()}
          />
          <OrbitControls
            enableDamping={false}
            enablePan={true}
            enableRotate={true}
            // You can limit the amount of rotation up/down left/right.
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
          <axesHelper args={[5]} />

          <gridHelper args={[5]} />

          {/* <Perf position="bottom-left" /> */}
        </Canvas>
        <Leva collapsed />
      </Container>
      );
    </>
  );
};

export default ThreeTest;
const Container = styled.div`
  //padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //width: 100vw;
  width: 100%;
  background-color: #232323;
`;
