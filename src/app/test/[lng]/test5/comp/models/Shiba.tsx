import { useGLTF, useAnimations } from "@react-three/drei";

const Shiba = () => {
  const model = useGLTF("/models/hammer.glb");
  return (
    <>
      <mesh>
        <primitive object={model.scene} />
      </mesh>
    </>
  );
};
export default Shiba;
