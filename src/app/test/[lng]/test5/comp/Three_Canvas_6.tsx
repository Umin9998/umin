"use client";

import React, { useEffect, useRef, useState, useMemo, memo } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Bounds,
  Environment,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  OrbitControls,
  RandomizedLight,
  TransformControls,
} from "@react-three/drei";

import * as THREE from "three";

import { MeshBasicMaterialParameters } from "three";

import { useControls } from "leva";
import ThreeObject from "./ThreeObject";
import useObjectStore_v6 from "../store/useObjectStore_v6";

const Three_Canvas_6 = ({
  threeCanvasRef,
  threeCameraRef,
  threeRendererRef,
  threeSceneRef,
  handleObjectChange,
}: any) => {
  const boxRef = useRef<MeshBasicMaterialParameters | null>(null);
  const [hovered, setHover] = useState(false);
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  const { objects, mode, target, addObject, selectObject, setMode } =
    useObjectStore_v6();
  const [selectedMode, setSelectedMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");

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
      <Canvas
        ref={threeCanvasRef}
        camera={{ position: [0, 0, 10] }}
        style={{ width: "100%", height: "400px", background: "#373C4B" }}
        onPointerMissed={() => {
          selectObject(null);
        }}
        onCreated={({ camera, gl, scene }: any) => {
          threeCameraRef.current = camera;
          threeRendererRef.current = gl;
          threeSceneRef.current = scene;

          camera.lookAt(0, 0, 0);
          scene.background = new THREE.Color(0x000000);
        }}
      >
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />

        {objects.map((object: any, index: any) => {
          return (
            <group key={index}>
              <ThreeObject
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
        <Shadows />

        <OrbitControls makeDefault />
        <Environment preset="city" />
        <gridHelper args={[20]} />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
      </Canvas>
    </>
  );
};

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));

Shadows.displayName = "Shadows";

export default Three_Canvas_6;
