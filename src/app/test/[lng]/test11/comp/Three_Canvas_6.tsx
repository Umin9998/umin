"use client";

import React, { useEffect, useRef, useState, useMemo, memo } from "react";
import { Raycaster, Vector2 } from "three";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Box,
  Float,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  Plane,
  RandomizedLight,
  Stage,
  TransformControls,
} from "@react-three/drei";

import * as THREE from "three";
import ThreeObject from "./ThreeObject";
import useKeyboard from "./useKeyboard";
import useObjectStore_v6 from "./useObjectStore_v6";
import { useControls } from "leva";
import { proxy, useSnapshot } from "valtio";
import Controls from "./Controls";
import ThreeObject_snapShot from "./ThreeObject_snapShot";

const Three_Canvas_6 = ({
  threeCanvasRef,
  threeCameraRef,
  threeSceneRef,
  objectDrop,
  findDragPosition,
  boxRef,
  threeRendererRef,
  isDragging,
}: any) => {
  const modes = ["translate", "rotate", "scale"];
  const state = proxy({ current: null, mode: 0 });
  const raycaster = useRef(new Raycaster());

  const [, set] = useControls(() => ({
    position: {
      value: { x: 0, y: 0, z: 0 },
      onChange: (value) => {
        if (boxRef.current) {
          boxRef.current.position.set(value.x, value.y, value.z);
        }
      },
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      onChange: (value) => {
        if (boxRef.current) {
          boxRef.current.rotation.set(value.x, value.y, value.z);
        }
      },
    },
    scale: {
      value: { x: 1, y: 1, z: 1 },
      onChange: (value) => {
        if (boxRef.current) {
          boxRef.current.scale.set(value.x, value.y, value.z);
        }
      },
    },
    color: {
      value: "#ff0000",
      onChange: (value) =>
        boxRef.current
          ? (boxRef.current.material.color = new THREE.Color(value))
          : null,
    },
  }));
  // const onMouseMove = (event: any) => {
  //   mouse.current.x = (event.clientX / threeCanvasRef.innerWidth) * 2 - 1;
  //   mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //   console.log("mouse move", mouse.current);
  // };
  const directionalCtl = useControls("Directional Light", {
    visible: true,
    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4,
    },
    castShadow: true,
  });
  const ambientCtl = useControls("Ambient Light", {
    visible: false,
    intensity: {
      value: 1.0,
      min: 0,
      max: 1.0,
      step: 0.1,
    },
  });

  return (
    <>
      <Canvas
        camera={{ position: [10, 10, 10] }}
        ref={threeCanvasRef}
        gl={{ antialias: true }}
        style={{
          marginLeft: "50rem",
          width: "50%",
          height: "400px",
          border: "1px solid ivory",
        }}
        // onMouseMove={handleMouseMove}
        onCreated={({ camera, gl, scene }: any) => {
          threeCameraRef.current = camera;
          threeRendererRef.current = gl;
          threeSceneRef.current = scene;

          camera.lookAt(0, 0, -10);
          scene.background = new THREE.Color(0xeeeeee);
        }}
        onDragOver={findDragPosition}
        onDrop={objectDrop}
        onMouseDown={(event: any) => {
          try {
            const camera = threeCameraRef.current;

            const renderer = threeRendererRef.current;
            const scene = threeSceneRef.current;
            let { clientX, clientY } = event;

            let canvasRect = threeCanvasRef.current.getBoundingClientRect();

            let mouse = new THREE.Vector2(
              ((clientX - canvasRect.left) / canvasRect.width) * 2 - 1,
              -((clientY - canvasRect.top) / canvasRect.height) * 2 + 1
            );

            raycaster.current.setFromCamera(mouse, camera);
            const intersects = raycaster.current.intersectObjects(
              scene.children,
              true
            );
            console.log(intersects[0].object.uuid, "intersects.object");
            const selectedObject = scene.getObjectByProperty(
              "uuid",
              intersects[0].object.uuid
            );
            console.log(selectedObject, "selectedObject");
            if (selectedObject.type === "Mesh") {
              console.log(`mesh${selectedObject.uuid} is selected`);
              boxRef.current = selectedObject;
            } else {
              console.log("no mesh is selected");
              boxRef.current = null;
            }
            // console.log("mouse down", intersects[0]);
          } catch (e) {
            console.log(e);
          }
        }}
        onPointerMissed={() => {
          // console.log(null);
          boxRef.current = null;
        }}
      >
        <ambientLight intensity={0.5} visible={ambientCtl.visible} />

        <directionalLight
          position={[0, 5, 5]}
          castShadow={directionalCtl.castShadow}
        />
        {/*  <Controls state={state} modes={modes}></Controls>*/}
        <OrbitControls makeDefault />
        {/* <gridHelper args={[20]} /> */}
        <axesHelper args={[10]} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial attach="material" color={"#cccccc"} />
        </mesh>
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

// const Shadows = memo(() => (
//   <AccumulativeShadows
//     temporal
//     frames={100}
//     color="#9d4b4b"
//     colorBlend={0.5}
//     alphaTest={0.9}
//     scale={20}
//   >
//     <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
//   </AccumulativeShadows>
// ));

// Shadows.displayName = "Shadows";

export default Three_Canvas_6;
