import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, TransformControls } from "@react-three/drei";

import { Leva } from "leva";
import styled from "styled-components";
import Polyhedron2 from "../../test3/comp/Polyhedron2";
import useKeyboard from "../../test3/customs/useKeyboard";
import useObjectStore from "../store/ObjectStore";

const Box = (props: any) => {
  const ref = useRef() as any;
  const { state, actions } = useObjectStore();
  const keyMap = useKeyboard();
  useFrame((_, delta) => {
    keyMap["KeyA"] && (ref.current.position.x -= 1 * delta);
    keyMap["KeyD"] && (ref.current.position.x += 1 * delta);
    keyMap["KeyW"] && (ref.current.position.z -= 1 * delta);
    keyMap["KeyS"] && (ref.current.position.z += 1 * delta);
    keyMap["space"] && (ref.current.position.z += 1 * delta);
  });
  // Hold state for hovered and clicked events
  const [hovered, setHover] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  console.log(state.current);
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(e) => {
        //  e.stopPropagation();
        actions.setCurrent(ref.current);
      }}
      onPointerMissed={(e) => e.type === "click" && (state.current = null)}
      onContextMenu={(e: any) => {
        e.stopPropagation();
        props.handleContextMenu(e.object);
        props.setMenuPos({ x: e.clientX, y: e.clientY });
      }}
      // eslint-disable-next-line no-sequences
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      dispose={null}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial name={props.name} color={props.color} />
    </mesh>
  );
};

export default Box;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #232323;
`;
