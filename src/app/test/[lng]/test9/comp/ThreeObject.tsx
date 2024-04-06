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
  boxRef,
  setHover,
  item,
}: any) => {
  const { setMode, target, updateObject, mode, selectObject } =
    useObjectStore_v6();
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
      value: { x: 1, y: 1, z: 1 },
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
  useEffect(() => {
    console.log("타겟타겟", target);
  }, [target]);
  const onMouseMove = (e: any) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    console.log(clientX, clientY, "clientX, clientY");
    // Get screen-space x/y
    // mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    // mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    // // Perform raycast
    // raycaster.setFromCamera( mouse, camera );

    // // See if the ray from the camera into the world hits our mesh
    // const intersects = raycaster.intersectObject( terrainMesh );

    // // Check if an intersection took place
    // if ( intersects.length > 0 ) {
    //     const posX = intersects[0].point.x;
    //     const posZ = intersects[0].point.z;
    //     console.log(posX, posZ);
    // }
  };
  return (
    <>
      <mesh
        {...props}
        ref={boxRef}
        onClick={(e: any) => {
          boxRef.current = e.object;
          selectObject(boxRef.current);
        }}
        // onPointerOver={(e: any) => (e.stopPropagation(), setHover(true))}
        // onPointerOut={(e: any) => setHover(false)}
        // dispose={null}
        // castShadow
        //onClick={(e) => console.log("click")}
        onContextMenu={(e) => console.log("context menu")}
        onDoubleClick={(e) => console.log("double click")}
        onWheel={(e) => console.log("wheel spins")}
        onPointerUp={(e) => console.log("up")}
        onPointerDown={(e) => console.log("down")}
        onPointerOver={(e) => console.log("over")}
        onPointerOut={(e) => console.log("out")}
        onPointerEnter={(e) => console.log("enter")}
        onPointerLeave={(e) => console.log("leave")}
        onPointerMove={(e) => {
          onMouseMove(e);
        }}
        onPointerMissed={() => console.log("missed")}
        onUpdate={(self) => console.log("props have been updated")}
      >
        {item.type === "BoxGeometry" && <boxGeometry args={[1, 1, 1]} />}
        {item.type === "SphereGeometry" && (
          <sphereGeometry args={[1, 15, 15]} />
        )}
        {item.type === "ConeGeometry" && <coneGeometry />}
        {item.type === "CylinderGeometry" && (
          <cylinderGeometry args={[1, 1, 1]} />
        )}
        {item.type === "CapsuleGeometry" && (
          <capsuleGeometry args={[1, 1, 1]} />
        )}
        {item.type === "TorusGeometry" && (
          <torusGeometry args={[1, 0.4, 16, 100]} />
        )}
        <meshStandardMaterial />
      </mesh>
      <TransformControls
        scale={1.5}
        object={target ?? undefined}
        onChange={handleObjectChange}
        mode={mode}
        onMouseDown={onControlStart}
        onMouseUp={onControlEnd}
      ></TransformControls>
    </>
  );
};

export default ThreeObject;
