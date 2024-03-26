import { OrbitControls, TransformControls } from "@react-three/drei";
import useObjectStore from "../store/ObjectStore"; // 앞서 작성한 Zustand 훅을 가져옴
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const Controls = () => {
  // Zustand 상태를 가져옴
  const { state, actions } = useObjectStore();

  const scene = useThree((state) => state.scene);

  useEffect(() => {
    console.log(state.current);
  }, [scene]);
  return (
    <>
      {state.current && (
        <TransformControls
          object={scene.getObjectByName(state.current.name)}
          mode={state.mode}
        />
      )}
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  );
};

export default Controls;
