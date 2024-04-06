import exp from "constants";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Three_Canvas_6 from "./Three_Canvas_6";
import * as THREE from "three";
import useObjectStore_v6 from "./useObjectStore_v6";
import GenerateObject from "./GenerateObject";
import ObjectList from "./ObjectList";
import useDragStore from "./dragStore";
import { Plane } from "@react-three/drei";

const TestComp = () => {
  const { objects, addObject, selectObject, setMode, clearObjects } =
    useObjectStore_v6();
  const [link, setLink] = useState<HTMLAnchorElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState<any>();
  const threeCanvasRef = useRef<any>();
  const threeCameraRef = useRef<any>();
  const threeRendererRef = useRef<any>();
  const threeSceneRef = useRef<any>();
  const boxRef = useRef<any>(null);
  const threeMouseRef = useRef<any>(null);
  const threeRaycaster = useRef<any>(null);
  const { newPosition, setNewPosition } = useDragStore();
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
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const object = new THREE.Mesh(geometry, material);

    if (threeSceneRef.current) {
      // console.log(object);
      threeSceneRef.current.add(object);
      addObject(object);
    }
  };
  const findDragPosition = (event: React.DragEvent<HTMLCanvasElement>) => {
    //console.log("seceneRef", threeSceneRef.current);
    event.preventDefault();
    const { clientX, clientY } = event;
    const canvasRect = threeCanvasRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((clientX - canvasRect.left) / threeCanvasRef.current.clientWidth) * 2 -
        1,
      -((clientY - canvasRect.top) / threeCanvasRef.current.clientHeight) * 2 +
        1
    );
    const newPosition = new THREE.Vector3(mouse.x, 0, 0);
    setDraggingPosition(newPosition);

    //console.log("raycaster", raycaster);
    console.log("newPosition", newPosition);
  };
  // const objectDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
  //   const { clientX, clientY } = event;
  //   const canvasRect = threeCanvasRef.current.getBoundingClientRect();
  //   const mouse = new THREE.Vector2(
  //     ((clientX - canvasRect.left) / threeCanvasRef.current.clientWidth) * 2 -
  //       1,
  //     -((clientY - canvasRect.top) / threeCanvasRef.current.clientHeight) * 2 +
  //       1
  //   );
  //   const newPosition = new THREE.Vector3(mouse.x, 0, 0);
  //   let geometry;
  //   switch (selectedObjectType) {
  //     case "Cube":
  //       geometry = new THREE.BoxGeometry();
  //       break;
  //     case "Cone":
  //       geometry = new THREE.ConeGeometry();
  //       break;
  //     case "Sphere":
  //       geometry = new THREE.SphereGeometry();
  //       break;
  //     case "Cylinder":
  //       geometry = new THREE.CylinderGeometry();
  //       break;
  //     case "Capsule":
  //       geometry = new THREE.CapsuleGeometry();
  //       break;
  //     case "Donut":
  //       geometry = new THREE.TorusGeometry();
  //       break;
  //   }
  //   const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  //   const newObject = new THREE.Mesh(geometry, material);
  //   newObject.position.copy(newPosition);

  //   threeSceneRef.current.add(newObject);
  //   addObject(newObject);
  //   console.log("threeSceneRef.current", threeSceneRef.current);
  // };
  const objectDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event;
    const canvasRect = threeCanvasRef.current.getBoundingClientRect();

    // Get screen-space x/y
    const mouse = new THREE.Vector2(
      ((clientX - canvasRect.left) / threeCanvasRef.current.clientWidth) * 2 -
        1,
      -((clientY - canvasRect.top) / threeCanvasRef.current.clientHeight) * 2 +
        1
    );

    // Perform raycast
    threeRaycaster.current.setFromCamera(mouse, threeCameraRef.current);

    // See if the ray from the camera into the world hits our mesh
    const intersects = threeRaycaster.current.intersectObject(Plane, true);

    // Check if an intersection took place
    if (intersects.length > 0) {
      const posX = intersects[0].point.x;
      const posZ = intersects[0].point.z;

      // Create new object based on the selected object type
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

      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const newObject = new THREE.Mesh(geometry, material);

      // Set the position of the new object based on the intersection point
      newObject.position.set(posX, 0, posZ);

      // Add the new object to the scene
      threeSceneRef.current.add(newObject);

      // Optionally, you can add the new object to your state or perform any other actions
      addObject(newObject);
    }
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
        findDragPosition={findDragPosition}
        objectDrop={objectDrop}
        threeMouseRef={threeMouseRef}
        threeCanvasRef={threeCanvasRef}
        threeCameraRef={threeCameraRef}
        threeRendererRef={threeRendererRef}
        threeSceneRef={threeSceneRef}
        boxRef={boxRef}
        setIsDragging={setIsDragging}
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
