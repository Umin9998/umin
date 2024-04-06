"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Stats, OrbitControls, TransformControls } from "@react-three/drei";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import useObjectStore_v6 from "../../store/useObjectStore_v6";
import Box3 from "../Geometries/Box3";

import Sphere from "../Geometries/Sphere";
import Cone2 from "../Geometries/Cone2";
import Cylinder from "../Geometries/Cylinder";
import Capsule from "../Geometries/Capsule";
import Donut from "../Geometries/Donut";

const Three_Canvas = ({ handleObjectChange, canvasRef }: any) => {
  const transformRef = useRef();
  const boxRef = useRef();
  const { objects, mode, target, addObject, selectObject, setMode } =
    useObjectStore_v6(); // useObjectStoresWithActions 훅 사용
  const [selectedMode, setSelectedMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const modes = ["translate", "rotate", "scale"];
  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(canvas, "canvas");
  }, []);

  return (
    <>
      <Canvas
        ref={canvasRef}
        style={{ width: "100%", height: "400px", background: "#373C4B" }}
        camera={{ position: [1, 5, 5] }}
        onPointerMissed={() => {
          selectObject(null);
        }}
      >
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <group>
          {objects
            .filter((object) => object.geometry.type === "BoxGeometry")
            .map((object: any, index: any) => {
              return (
                <Box3
                  ref={boxRef}
                  color="#aaffaa"
                  props={object[index]}
                  key={index}
                ></Box3>
              );
            })}
          {objects
            .filter((object) => object.geometry.type === "SphereGeometry")
            .map((object: any, index: any) => {
              return (
                <Sphere
                  ref={boxRef}
                  color="#ffaaaa"
                  props={object[index]}
                  key={index}
                ></Sphere>
              );
            })}
          {objects
            .filter((object) => object.geometry.type === "ConeGeometry")
            .map((object: any, index: any) => {
              return (
                <Cone2
                  ref={boxRef}
                  color="#aaffff"
                  props={object[index]}
                  key={index}
                ></Cone2>
              );
            })}
          {objects
            .filter((object) => object.geometry.type === "CylinderGeometry")
            .map((object: any, index: any) => {
              return (
                <Cylinder
                  ref={boxRef}
                  color="#f0f099"
                  props={object[index]}
                  key={index}
                ></Cylinder>
              );
            })}
          {objects
            .filter((object) => object.geometry.type === "CapsuleGeometry")
            .map((object: any, index: any) => {
              return (
                <Capsule
                  ref={boxRef}
                  color="#ffaaff"
                  props={object[index]}
                  key={index}
                ></Capsule>
              );
            })}
          {objects
            .filter((object) => object.geometry.type === "TorusGeometry")
            .map((object: any, index: any) => {
              return (
                <Donut
                  ref={boxRef}
                  color="#aaaaff"
                  props={object[index]}
                  key={index}
                ></Donut>
              );
            })}
        </group>

        {target != null && (
          <TransformControls
            onObjectChange={handleObjectChange}
            object={target as any}
            mode={mode}
          />
        )}
        <OrbitControls
          makeDefault
          minPolarAngle={1}
          maxPolarAngle={Math.PI / 1.75}
        />
        <gridHelper args={[20]} />
      </Canvas>
    </>
  );
};

export default Three_Canvas;
