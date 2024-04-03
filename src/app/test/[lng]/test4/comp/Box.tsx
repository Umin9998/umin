import { useState, useEffect, useRef, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, TransformControls } from "@react-three/drei";

import { Leva, useControls } from "leva";
import styled from "styled-components";
import Polyhedron2 from "../../test3/comp/Polyhedron2";
import useKeyboard from "../../test3/customs/useKeyboard";
import useObjectStore from "../store/ObjectStore";

const Box = forwardRef((props: any, ref: any) => {
  // const { state, actions } = useObjectStore();
  const keyMap = useKeyboard();
  // useFrame((_, delta) => {
  //   keyMap["KeyA"] && (state.current.position.x -= 1 * delta);
  //   keyMap["KeyD"] && (state.current.position.x += 1 * delta);
  //   keyMap["KeyW"] && (state.current.position.z -= 1 * delta);
  //   keyMap["KeyS"] && (state.current.position.z += 1 * delta);
  //   keyMap["space"] && (state.current.position.z += 1 * delta);
  // });
  // Hold state for hovered and clicked events
  const [hovered, setHover] = useState(false);
  const scene = useThree((state) => state.scene);
  const mesh = useThree((state) =>
    state.scene.children.filter((child) => child.name === props.name)
  );
  console.log(mesh);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += delta));
  useControls(props.name, {
    wireframe: {
      value: false,
      onChange: (v) => {
        const selectedObject = scene.getObjectByName(props.name);
        console.log(selectedObject);
      },
    },

    color: {
      value: "#ccc",
      onChange: (v) => {
        const selectedObject = scene.getObjectByName(props.name);
        console.log(selectedObject);
        const newColor = new THREE.Color(v);
        console.log(newColor);
        // actions.setCurrent({ ...state.current, color: newColor });
      },
    },
  });
  return (
    <mesh
      ref={ref}
      {...props}
      onClick={(e) => {
        // actions.setCurrent(e.object);
        ref.current = e.object;
        console.log(ref.current);
      }}
      // onPointerMissed={(e) => e.type === "click" && (state.current = null)}
      // onContextMenu={(e: any) => {
      //   e.stopPropagation();
      //   handleContextMenu(e.object);
      //   setMenuPos({ x: e.clientX, y: e.clientY });
      // }}
      // eslint-disable-next-line no-sequences
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      dispose={null}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial {...props} />
    </mesh>
  );
});
export default Box;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #232323;
`;
