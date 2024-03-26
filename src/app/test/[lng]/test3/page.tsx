"use client";

import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

import "./styles.css";
import Box from "./comp/Box";
import { useMemo } from "react";
import Polyhedron2 from "./comp/Polyhedron2";
import Lights from "./comp/Lights";
import Floor from "./comp/Floor";
import useKeyboard from "./customs/useKeyboard";

const Page = () => {
  const keyMap = useKeyboard();

  const polyhedron = useMemo(
    () => [
      new THREE.BoxGeometry(),
      new THREE.SphereGeometry(0.785398),
      new THREE.DodecahedronGeometry(0.785398),
    ],
    []
  );

  return (
    <Canvas camera={{ position: [4, 4, 10] }} shadows>
      <Lights />
      {/* <Polyhedron2
        name="meshBasicMaterial"
        position={[-3, 1, 0]}
        material={new THREE.MeshBasicMaterial()}
      /> */}
      <Polyhedron2
        keyMap={keyMap}
        name="meshNormalMaterial"
        position={[1, 1, 0]}
        material={new THREE.MeshNormalMaterial()}
      />
      {/* <Polyhedron2
        name="meshPhongMaterial"
        position={[1, 1, 0]}
        material={new THREE.MeshPhongMaterial()}
      />
      <Polyhedron2
        name="meshStandardMaterial"
        position={[3, 1, 0]}
        material={new THREE.MeshStandardMaterial()}
      /> */}
      <Floor />
      <OrbitControls target={[2, 2, 0]} />
      <axesHelper args={[5]} />
      <gridHelper />
      <Stats />
    </Canvas>
  );
};

export default Page;
