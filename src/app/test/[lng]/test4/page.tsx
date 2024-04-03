"use client";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, TransformControls } from "@react-three/drei";

import "./styles.css";

import Box2 from "./comp/Box2";
import useObjectStore2 from "./store/ObjectStore2";
import { useControls } from "leva";
import { useEffect, useMemo, useRef, useState } from "react";
import { object, style } from "blockly/core/utils";
import styled from "styled-components";

export default function Page() {
  const { target, setTarget } = useObjectStore2();
  const canvasRef = useRef();
  const [objects, setObjects] = useState<any>([]);
  const [controls, setControls] = useState({});
  useEffect(() => {
    target && console.log(target);
  }, [target]);
  const { mode } = useControls({
    mode: { value: "translate", options: ["translate", "rotate", "scale"] },
  });
  // const options = useMemo(() => {
  //   return {
  //     position_x: { value: 0, min: -5, max: 5, step: 0.01 },
  //     position_y: { value: 0, min: -5, max: 5, step: 0.01 },
  //     position_z: { value: 0, min: -5, max: 5, step: 0.01 },
  //     rotation_x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  //     rotation_y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  //     rotation_z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  //     scale_x: { value: 1, min: 0, max: 5, step: 0.01 },
  //     scale_y: { value: 1, min: 0, max: 5, step: 0.01 },
  //     scale_z: { value: 1, min: 0, max: 5, step: 0.01 },
  //     visible: true,
  //     wireframe: false,
  //     color: { value: "pink" },
  //   };
  // }, []);
  const options = {
    position_x: { value: 0, min: -5, max: 5, step: 0.01 },
    position_y: { value: 0, min: -5, max: 5, step: 0.01 },
    position_z: { value: 0, min: -5, max: 5, step: 0.01 },
    rotation_x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    rotation_y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    rotation_z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    scale_x: { value: 1, min: 0, max: 5, step: 0.01 },
    scale_y: { value: 1, min: 0, max: 5, step: 0.01 },
    scale_z: { value: 1, min: 0, max: 5, step: 0.01 },
    visible: true,
    wireframe: false,
    color: { value: "pink" },
  };

  const generate3DObject = () => {
    console.log("generate3DObject");
    const defaultValues = objects.length === 0 ? 1 : objects.length + 1;

    const newObjects = {
      id: objects.length + 1,
      position: [defaultValues, 1, 1],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      visible: true,
      color: "pink",
      wireframe: false,
    };
    setObjects([...objects, newObjects]);
    //addControlsForObject(newObjects.id);
  };
  const addControlsForObject = (id: number) => {
    const newControl = { [id]: useControls(`Box${id}`, options) };
    setControls({
      ...controls,
      newControl,
    });
  };
  const BoxA = useControls("BoxA", options);
  const BoxB = useControls("BoxB", options);

  useEffect(() => {}, [objects]);
  return (
    <>
      <Generate
        onClick={() => {
          generate3DObject();
        }}
      >
        <div className="rect"></div>
        <div>Cube</div>
      </Generate>
      <Canvas
        style={{ width: "500px", height: "400px", background: "#eee" }}
        camera={{ position: [1, 2, 3] }}
        onPointerMissed={() => {
          setTarget(null);
        }}
      >
        {objects.map((object: any, index: any) => {
          return (
            <Box2
              setTarget={setTarget}
              position={[
                object.position[0],
                object.position[1],
                object.position[2],
              ]}
              rotation={[
                object.rotation[0],
                object.rotation[1],
                object.rotation[2],
              ]}
              scale={[object.scale[0], object.scale[1], object.scale[2]]}
              visible={object.visible}
              color={object.color}
              wireframe={object.wireframe}
              key={index}
            />
          );
        })}
        <Box2
          setTarget={setTarget}
          position={[BoxA.position_x, BoxA.position_y, BoxA.position_z]}
          rotation={[BoxA.rotation_x, BoxA.rotation_y, BoxA.rotation_z]}
          scale={[BoxA.scale_x, BoxA.scale_y, BoxA.scale_z]}
          visible={BoxA.visible}
          color={BoxA.color}
          wireframe={BoxA.wireframe}
        />
        <Box2
          setTarget={setTarget}
          position={[(BoxB.position_x = +2), BoxB.position_y, BoxB.position_z]}
          rotation={[BoxB.rotation_x, BoxB.rotation_y, BoxB.rotation_z]}
          scale={[BoxB.scale_x, BoxB.scale_y, BoxB.scale_z]}
          visible={BoxB.visible}
          color={BoxB.color}
          wireframe={BoxB.wireframe}
        />
        {target && <TransformControls object={target} mode={mode} />}
        <OrbitControls
          makeDefault
          minPolarAngle={1}
          maxPolarAngle={Math.PI / 1.75}
        />
        <gridHelper />
      </Canvas>
    </>
  );
}

const Generate = styled.div`
  cursor: pointer;
  width: 10rem;

  background-color: #eee;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  gap: 1rem;
  .rect {
    width: 3rem;
    height: 3rem;
    background-color: pink;
  }
`;
