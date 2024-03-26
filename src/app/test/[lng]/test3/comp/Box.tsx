import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const Box = (props: any) => {
  const ref = useRef() as any;
  const [hovered, setHover] = useState(false);
  const [rotate, setRotate] = useState(true);

  // useFrame((_, delta) => {
  //   if (rotate) {
  //     ref.current.rotation.x += 1 * delta;
  //     ref.current.rotation.y += 0.5 * delta;
  //   }
  // });
  return (
    <mesh
    // {...props}
    // ref={ref}
    // scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    // onPointerDown={() => setRotate(!rotate)}
    // onPointerOver={() => setHover(true)}
    // onPointerOut={() => setHover(false)}
    >
      <boxGeometry />
      <meshBasicMaterial color={hovered ? 0xff0000 : "#333399"} wireframe />
    </mesh>
  );
};

export default Box;
