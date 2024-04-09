import { useFrame, useThree } from "@react-three/fiber";

import { use, useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";
import { Leva, useControls } from "leva";
import test from "node:test";
import { TransformControls } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import useObjectStore_v6 from "./useObjectStore_v6";
import useKeyboard from "./useKeyboard";
interface ControllableBoxProps {
  onControlStart: () => void;
  onControlEnd: () => void;
}
const ThreeObject = ({
  boxRef,
  setHover,
  item,
  draggingPosition,
  position,
}: any) => {
  console.log(draggingPosition, "draggedPosition");
  const { setMode, mode } = useObjectStore_v6();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  console.log(item, "item");
  const keyMap = useKeyboard();
  useFrame(() => {
    keyMap["KeyW"] && setMode("translate");
    keyMap["KeyE"] && setMode("rotate");
    keyMap["KeyR"] && setMode("scale");
  });
  const [, set] = useControls(() => ({
    position: {
      value: { x: position.x, y: position.y, z: position.z },
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

  const handleObjectChange = () => {
    if (boxRef.current) {
      set({
        position: {
          x: boxRef.current.position.x,
          y: boxRef.current.position.y,
          z: boxRef.current.position.z,
        },
      });
      set({
        rotation: {
          x: boxRef.current.rotation.x,
          y: boxRef.current.rotation.y,
          z: boxRef.current.rotation.z,
        },
      });
      set({
        scale: {
          x: boxRef.current.scale.x,
          y: boxRef.current.scale.y,
          z: boxRef.current.scale.z,
        },
      });
    }
  };

  return (
    <>
      <TransformControls
        scale={1.5}
        object={boxRef.current ?? undefined}
        onChange={handleObjectChange}
        mode={mode}
      >
        <mesh
          geometry={item.geometry}
          position={position}
          ref={boxRef}
          onClick={(e: any) => {
            boxRef.current = e.object;
            // selectObject(boxRef.current);
          }}
          onPointerOver={(e: any) => (e.stopPropagation(), setHover(true))}
          onPointerOut={(e: any) => setHover(false)}
          dispose={null}
          castShadow
        >
          {/* {item.geometry.type === "BoxGeometry" && (
          <boxGeometry args={[1, 1, 1]} />
        )}
        {item.type === "SphereGeometry" && (
          <sphereGeometry args={[1, 15, 15]} />
        )}
        {item.geometry.type === "ConeGeometry" && <coneGeometry />}
        {item.geometry.type === "CylinderGeometry" && (
          <cylinderGeometry args={[1, 1, 1]} />
        )}
        {item.geometry.type === "CapsuleGeometry" && (
          <capsuleGeometry args={[1, 1, 1]} />
        )}
        {item.geometry.type === "TorusGeometry" && (
          <torusGeometry args={[1, 0.4, 16, 100]} />
        )} */}
          <meshStandardMaterial />
        </mesh>
      </TransformControls>
    </>
  );
};

export default ThreeObject;
