import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Polyhedron = ({ polyhedron, color, ...props }: any) => {
  const ref = useRef() as any;
  const [count, setCount] = useState(0);

  console.log(polyhedron);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3);
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
};

export default Polyhedron;
