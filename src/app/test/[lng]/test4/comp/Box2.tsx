import { useCursor } from "@react-three/drei";
import useObjectStore2 from "../store/ObjectStore2";
import { useState } from "react";

const Box2 = (props: any) => {
  const setTarget = useObjectStore2((state: any) => state.setTarget);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return (
    <mesh
      {...props}
      onClick={(e) => {
        setTarget(e.object);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshBasicMaterial color={props.color} wireframe={props.wireframe} />
    </mesh>
  );
};

export default Box2;
