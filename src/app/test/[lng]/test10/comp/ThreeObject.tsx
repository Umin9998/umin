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
  onControlStart,
  onControlEnd,
  props,
  setSelectedMode,
  object,
  key,
  selectObject,
  boxRef,
  setHover,
}: any) => {
  const { setMode, target, updateObject, mode } = useObjectStore_v6();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const keyMap = useKeyboard();
  useFrame(() => {
    keyMap["KeyW"] && setMode("translate");
    keyMap["KeyE"] && setMode("rotate");
    keyMap["KeyR"] && setMode("scale");
  });
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
      // set({
      //   color: boxRef.current.material.color.getHexString(),
      // });
    }
  };
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) =>
      set({
        position: { x: x / aspect, y: -y / aspect, z: 0 },
        rotation: { x: y / aspect, y: x / aspect, z: 0 },
      }),
    onHover: ({ hovering }) =>
      set({
        scale: hovering ? { x: 1.2, y: 1.2, z: 1.2 } : { x: 1, y: 1, z: 1 },
      }),
  });
  return (
    <>
      <TransformControls
        scale={1.2}
        object={boxRef.current ?? undefined}
        onChange={handleObjectChange}
        onMouseDown={onControlStart}
        onMouseUp={onControlEnd}
        mode={mode}
      >
        <mesh
          // {...bind()}
          {...props}
          ref={boxRef}
          {...object}
          onClick={(e: any) => {
            boxRef.current = e.object;
            selectObject(boxRef.current);
            setSelectedMode("translate");
          }}
          onPointerOver={(e: any) => (e.stopPropagation(), setHover(true))}
          onPointerOut={(e: any) => setHover(false)}
          dispose={null}
          position={[object.position.x, object.position.y, object.position.z]}
          rotation={[object.rotation.x, object.rotation.y, object.rotation.z]}
          scale={[object.scale.x, object.scale.y, object.scale.z]}
          castShadow
        >
          {object.geometry.type === "BoxGeometry" && (
            <boxGeometry args={[1, 1, 1]} />
          )}
          {object.geometry.type === "SphereGeometry" && (
            <sphereGeometry args={[1, 15, 15]} />
          )}
          {object.geometry.type === "ConeGeometry" && <coneGeometry />}
          {object.geometry.type === "CylinderGeometry" && (
            <cylinderGeometry args={[1, 1, 1]} />
          )}
          {object.geometry.type === "CapsuleGeometry" && (
            <capsuleGeometry args={[1, 1, 1]} />
          )}
          {object.geometry.type === "TorusGeometry" && (
            <torusGeometry args={[1, 0.4, 16, 100]} />
          )}
          <meshStandardMaterial />
        </mesh>
      </TransformControls>
    </>
  );
};

export default ThreeObject;
