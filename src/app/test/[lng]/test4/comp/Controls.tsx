import { OrbitControls, TransformControls } from "@react-three/drei";
import useObjectStore from "../store/ObjectStore";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const Controls = () => {
  // Zustand 상태를 가져옴
  const { state, actions } = useObjectStore();

  const scene = useThree((state) => state.scene);

  useEffect(() => {
    state.current && console.log(state.current);
  }, [scene, state.current]);
  return (
    <>
      {state.current && (
        <TransformControls
          object={state.current}
          mode={state.mode}
          onChange={() => {
            actions.setCurrent(state.current);
          }}
        />
      )}
      <OrbitControls
        makeDefault
        minPolarAngle={1}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  );
};

export default Controls;
