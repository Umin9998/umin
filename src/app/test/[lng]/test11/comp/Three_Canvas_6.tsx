"use client";

import React, { useEffect, useRef, useState, useMemo, memo } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Float,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";

import * as THREE from "three";
import ThreeObject from "./ThreeObject";

const Three_Canvas_6 = ({
  threeCanvasRef,
  threeCameraRef,
  threeSceneRef,

  objectDrop,
  findDragPosition,
  boxRef,
}: any) => {
  const [hover, setHover] = useState(false);
  useEffect(() => {
    threeSceneRef.current = new THREE.Scene();
  }, []);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 10] }}
        ref={threeCanvasRef}
        gl={{ antialias: true }}
        style={{
          marginLeft: "50rem",
          width: "50%",
          height: "400px",
          backgroundColor: "#373C4B",
          pointerEvents: "auto",
        }}
        // onMouseMove={handleMouseMove}
        onCreated={({ camera }: any) => {
          // camera.lookAt(0, 0, 0);
          threeCameraRef.current = camera;
        }}
        onDragOver={findDragPosition}
        onDrop={objectDrop}
        onPointerMissed={() => {
          console.log(null);
          boxRef.current = null;
        }}
      >
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />

        {threeSceneRef.current &&
          threeSceneRef.current.children.map((object: any, index: any) => {
            return (
              <ThreeObject
                key={index}
                item={object}
                boxRef={boxRef}
                setHover={setHover}
              />
            );
          })}
        <Shadows />
        <OrbitControls makeDefault />
        <gridHelper args={[20]} />
        <Float />
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
