import styled from "styled-components";

import useObjectStore_v6 from "../store/useObjectStore_v6";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import GenerateObject from "./editor/GenerateObject";
import Three_Canvas from "./editor/Three_Canvas";
import Toolbar_v3 from "./editor/Toolbar_v3";
import Three_Canvas_6 from "./editor/Three_Canvas_6";
import Toolbar_v4 from "./editor/Toolbar_v4";
import Toolbar_v5_leva from "./editor/Toolbar_v5_leva";

const ThreeContainer = ({
  threeCanvasRef,
  threeCameraRef,
  threeSceneRef,
  threeRendererRef,
}: any) => {
  const { objects, addObject, selectObject, setMode, updateObject } =
    useObjectStore_v6(); // useObjectStoresWithActions 훅 사용
  const [newObject, setNewObject] = useState<any>([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 }); // 인풋 값의 상태
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 }); // 인풋 값의 상태
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 }); // 인풋 값의 상태

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const material = new THREE.MeshStandardMaterial();
    const newObject_ = new THREE.Mesh(geometry, material);
    setNewObject([...newObject, newObject_]);
    addObject(newObject_);
  };
  useEffect(() => {
    console.log(objects);
  }, [newObject]);
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
  const handlePositionChange = (e: any) => {
    const { name, value } = e.target;
    setPosition((prevPosition) => ({
      ...prevPosition,
      [name]: parseFloat(value),
    }));
  };
  const handleRotationChange = (e: any) => {
    const { name, value } = e.target;
    setRotation((prevRotation) => ({
      ...prevRotation,
      [name]: parseFloat(value),
    }));
  };
  const handleScaleChange = (e: any) => {
    const { name, value } = e.target;

    setScale((prevScale) => ({
      ...prevScale,
      [name]: parseFloat(value),
    }));
  };

  useEffect(() => {}, [position, rotation, scale]);
  return (
    <>
      <Container>
        <Three_Canvas_6
          threeCanvasRef={threeCanvasRef}
          threeCameraRef={threeCameraRef}
          threeRendererRef={threeRendererRef}
          threeSceneRef={threeSceneRef}
          handleObjectChange={handleObjectChange}
          objects={objects}
        ></Three_Canvas_6>
        <GenerateObject generate3DObject={generate3DObject}></GenerateObject>
        {/* <Toolbar_v5_leva></Toolbar_v5_leva>
        <Toolbar_v4
          handlePositionChange={handlePositionChange}
          handleRotationChange={handleRotationChange}
          handleScaleChange={handleScaleChange}
          position={position}
          rotation={rotation}
          scale={scale}
        /> */}
      </Container>
    </>
  );
};

export default ThreeContainer;
const Container = styled.div`
  background-color: #373c4b;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
