import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import useKeyboard from "../customs/useKeyboard";
const Polyhedron2 = ({ polyhedron, color, ...props }: any) => {
  const ref = useRef() as any;
  const [selected, setSelected] = useState(props.selected);

  const keyMap = useKeyboard();

  useFrame((_, delta) => {
    keyMap["KeyA"] && (ref.current.position.x -= 1 * delta);
    keyMap["KeyD"] && (ref.current.position.x += 1 * delta);
    keyMap["KeyW"] && (ref.current.position.z -= 1 * delta);
    keyMap["KeyS"] && (ref.current.position.z += 1 * delta);
    keyMap["space"] && (ref.current.position.z += 1 * delta);
  });

  useControls(props.name, {
    wireframe: {
      value: false,
      onChange: (v) => {
        ref.current.material.wireframe = v;
      },
    },
    flatShading: {
      value: true,
      onChange: (v) => {
        ref.current.material.flatShading = v;
        ref.current.material.needsUpdate = true;
      },
    },
    color: {
      value: "lime",
      onChange: (v) => {
        ref.current.material.color = new THREE.Color(v);
      },
    },
  });
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      receiveShadow
      onPointerDown={() => setSelected(!selected)}
    >
      <boxGeometry args={[1, 1]} />
    </mesh>
  );
};

export default Polyhedron2;
