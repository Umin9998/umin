import exp from "constants";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Three_Canvas_6 from "./Three_Canvas_6";
import * as THREE from "three";
import useObjectStore_v6 from "./useObjectStore_v6";
import GenerateObject from "./GenerateObject";
import ObjectList from "./ObjectList";
import useDragStore from "./dragStore";
import { Plane, TransformControls } from "@react-three/drei";
import { object } from "blockly/core/utils";

const TestComp = () => {
  const { clearObjects, addObject } = useObjectStore_v6();
  const [link, setLink] = useState<HTMLAnchorElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState<any>();

  const threeCanvasRef = useRef<any>();
  const threeCameraRef = useRef<any>();
  const threeRendererRef = useRef<any>();
  const threeSceneRef = useRef<any>();
  const threeControlsRef = useRef<any>();
  const boxRef = useRef<any>(null);
  const threeMouseRef = useRef<any>(null);
  const threeRaycaster = useRef<any>(null);

  const [selectedObjectType, setSelectedObjectType] = useState<string>("");

  useEffect(() => {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594
    setLink(link);

    if (threeCanvasRef.current) {
      console.log("threeCanvasRef.current", threeCanvasRef.current);
    }
  }, [threeCanvasRef.current]);

  const findDragPosition = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsDragging(true);

    let { clientX, clientY } = event;

    let canvasRect = threeCanvasRef.current.getBoundingClientRect();

    let mouse = new THREE.Vector2(
      ((clientX - canvasRect.left) / canvasRect.width) * 2 - 1,
      -((clientY - canvasRect.top) / canvasRect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, threeCameraRef.current);

    const intersects = raycaster.intersectObjects(
      threeSceneRef.current.children
    );

    if (intersects.length > 0) {
      const posX = intersects[0].point.x;
      const posZ = intersects[0].point.z;
      console.log("Intersection at:", posX, posZ);
      setDraggingPosition({ x: posX, z: posZ });
    } else {
      console.log("threeSceneRef.current.", threeSceneRef.current);
    }
  };

  const objectDrop = () => {
    let geometry;

    switch (selectedObjectType) {
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
    const color = new THREE.Color(Math.random() * 0xffffff);
    const hexColor = "#" + color.getHexString();
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(hexColor),
    });
    const object3d = new THREE.Mesh(geometry, material);
    const boundingBox = new THREE.Box3().setFromObject(object3d);
    const objectHeight = boundingBox.max.y - boundingBox.min.y;
    const positionY = objectHeight / 2;
    object3d.position.set(draggingPosition.x, positionY, draggingPosition.z);

    threeSceneRef.current.add(object3d);

    setIsDragging(false);
  };
  const createObject = (objectType: string) => {
    let geometry;

    switch (objectType) {
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
    const color = new THREE.Color(Math.random() * 0xffffff);
    const hexColor = "#" + color.getHexString();
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(hexColor),
    });
    const object3d = new THREE.Mesh(geometry, material);
    const positionY = object3d.scale.y / 2;
    object3d.position.set(0, positionY, 0);

    threeSceneRef.current.add(object3d);
  };
  return (
    <>
      <h2 style={{ fontSize: "10rem", color: "eee" }}>test11</h2>
      <GenerateObject
        threeSceneRef={threeSceneRef}
        threeRaycaster={threeRaycaster}
        setSelectedObjectType={setSelectedObjectType}
        createObject={createObject}
      ></GenerateObject>
      <Three_Canvas_6
        isDragging={isDragging}
        draggingPosition={draggingPosition}
        objectDrop={objectDrop}
        threeMouseRef={threeMouseRef}
        threeCanvasRef={threeCanvasRef}
        threeCameraRef={threeCameraRef}
        threeRendererRef={threeRendererRef}
        threeSceneRef={threeSceneRef}
        boxRef={boxRef}
        findDragPosition={findDragPosition}
        threeRaycaster={threeRaycaster}
      ></Three_Canvas_6>
      <Clear
        onClick={() => {
          clearObjects();
        }}
      >
        🗑️
      </Clear>
    </>
  );
};

export default TestComp;

//처음 클릭 했을 땐 냅두고, 드래그 시작하면 3d object 생성

const GenerateBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

const Clear = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #373c4b;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 50%;
  margin: 1rem;
  cursor: pointer;
`;
