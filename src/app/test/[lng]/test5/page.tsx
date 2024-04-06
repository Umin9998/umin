"use client";

import useKeyboard from "../test3/customs/useKeyboard";
import "./styles.css";

import Canvas1 from "./comp/Canvas1";
import { useRef, useState } from "react";
import useObjectStore_v6 from "./store/useObjectStore_v6";
import { MeshBasicMaterialParameters } from "three";
import GenerateObject from "./comp/GenerateObject";
import * as THREE from "three";
const Page = () => {
  const { objects, addObject, selectObject, setMode, updateObject } =
    useObjectStore_v6(); // useObjectStoresWithActions 훅 사용
  const keyMap = useKeyboard();
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 }); // 인풋 값의 상태
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 }); // 인풋 값의 상태
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 }); // 인풋 값의 상태

  const threeCanvasRef = useRef<any>();
  const threeCameraRef = useRef<any>();
  const threeRendererRef = useRef<any>();
  const threeSceneRef = useRef<any>();

  const boxRef = useRef<MeshBasicMaterialParameters | null>(null);
  const handleObjectChange = (e: any) => {
    console.log("변했어");
    setPosition({
      x: e.target.object.position.x,
      y: e.target.object.position.y,
      z: e.target.object.position.z,
    });

    setRotation({
      x: e.target.object.rotation.x,
      y: e.target.object.rotation.y,
      z: e.target.object.rotation.z,
    });
    setScale({
      x: e.target.object.scale.x,
      y: e.target.object.scale.y,
      z: e.target.object.scale.z,
    });
    const newObject = {
      ...e.target.object,
      position: {
        x: e.target.object.position.x,
        y: e.target.object.position.y,
        z: e.target.object.position.z,
      },
      rotation: {
        x: e.target.object.rotation.x,
        y: e.target.object.rotation.y,
        z: e.target.object.rotation.z,
      },
      scale: {
        x: e.target.object.scale.x,
        y: e.target.object.scale.y,
        z: e.target.object.scale.z,
      },
    };
    console.log(newObject, "newObject");
    selectObject(newObject);
    updateObject(newObject);
  };
  const generate3DObject = (type: string) => {
    let geometry;

    switch (type) {
      case "Cube":
        geometry = new THREE.BoxGeometry();
        break;
      case "Cone":
        geometry = new THREE.ConeGeometry();
        break;
      case "Sphere":
        geometry = new THREE.SphereGeometry();
        break;
      case "Cylinder":
        geometry = new THREE.CylinderGeometry();
        break;
      case "Capsule":
        geometry = new THREE.CapsuleGeometry();
        break;
      case "Donut":
        geometry = new THREE.TorusGeometry();
        break;
    }
  };
  return (
    <>
      <Canvas1
        threeCanvasRef={threeCanvasRef}
        threeCameraRef={threeCameraRef}
        threeRendererRef={threeRendererRef}
        threeSceneRef={threeSceneRef}
        handleObjectChange={handleObjectChange}
      ></Canvas1>
      <GenerateObject generate3DObject={generate3DObject}></GenerateObject>
    </>
  );
};

export default Page;
