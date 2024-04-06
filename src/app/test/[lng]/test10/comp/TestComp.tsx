import exp from "constants";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Three_Canvas_6 from "./Three_Canvas_6";
import * as THREE from "three";
import useObjectStore_v6 from "./useObjectStore_v6";
import GenerateObject from "./GenerateObject";
import ObjectList from "./ObjectList";

import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
const TestComp = () => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(false);
  const [threeDisplay, setThreeDisplay] = useState(false);
  const [startTime, setStartTime] = useState<any>();
  const { objects, addObject, selectObject, setMode } = useObjectStore_v6();

  //const [size, setSize] = useState({ width: "640px", height: "480px" });
  const [position, setPosition] = useState({ x: 300, y: 300 });
  const [link, setLink] = useState<HTMLAnchorElement | null>(null);
  const [selectedObjectType, setSelectedObjectType] = useState<string>("");
  const [newObject, setNewObject] = useState<any>([]);
  const parentRef = useRef<any>();
  const childRef = useRef<any>();
  const handleRef = useRef<any>();
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0, z: 0 });
  const threeCanvasRef = useRef<any>();
  const threeCameraRef = useRef<any>();
  const threeRendererRef = useRef<any>();
  const threeSceneRef = useRef<any>();

  useEffect(() => {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594
    setLink(link);

    if (threeCanvasRef.current) {
      console.log("threeCanvasRef.current", threeCanvasRef.current);
    }
  }, [threeCanvasRef.current]);

  // const handleMouseDown = () => {
  //   const startTime_ = Date.now();
  //   const startDate = new Date(startTime_);
  //   setStartTime(startDate);
  //   setTimeout(() => {
  //     setTime(true); // 0.5초 후에 time 상태 업데이트
  //   }, 500);
  //   return setTime(false);
  // };
  // const handleMouseUp = () => {
  //   if (time == false) {
  //     console.log("이건 클릭");
  //     generate3DObject(selectedObjectType, newPosition);
  //   } else {
  //     console.log("이건 드래그");
  //     setThreeDisplay(true);
  //   }
  // };
  //   const handleExport = () => {
  //     console.log('handleExport');

  //     if (threeSceneRef.current) {
  //       //const geometry = new THREE.BufferGeometry();
  //       const geometries: any[] = [];

  //       threeSceneRef.current.traverse(function (child: any) {
  //         if (child.isMesh) {
  //           child.updateMatrix(); // Important

  //           geometries.push(child.geometry.clone().applyMatrix4(child.matrix));
  //           //geometries.push(child.geometry.clone());
  //           //geometries.push(child.geometry);
  //         }
  //       });
  //       // Merge the geometries into a single BufferGeometry
  //       const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries, false);
  //       //const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);

  //       //const geometry = new THREE.BufferGeometry().fromGeometry(threeSceneRef.current

  //       console.log('mergedGeometry', mergedGeometry);

  //       // Step 2: Export to GLTF
  //       // https://threejs.org/docs/?q=GLTFExporter#examples/en/exporters/GLTFExporter
  //       //const exporter = new GLTFExporter();
  //       //const fbx = exporter.parse(mergedMesh);

  //       // Parse the input and generate the glTF output
  //       // exporter.parse(
  //       //   threeSceneRef.current,
  //       //   //mergedGeometry,
  //       //   // called when the gltf has been generated
  //       //   function (gltf) {
  //       //     console.log(gltf);
  //       //     //downloadJSON( gltf );
  //       //   },
  //       //   // called when there is an error in the generation
  //       //   function (error) {
  //       //     console.log('An error happened');
  //       //   }
  //       //   //options
  //       // );

  //       exportGLTF(threeSceneRef.current);
  //     }
  //   };

  function save(blob: any, filename: any) {
    if (link === null) return;

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // URL.revokeObjectURL( url ); breaks Firefox...
  }

  function saveString(text: any, filename: any) {
    save(new Blob([text], { type: "text/plain" }), filename);
  }

  function saveArrayBuffer(buffer: any, filename: any) {
    save(new Blob([buffer], { type: "application/octet-stream" }), filename);
  }

  const params = {
    trs: false,
    onlyVisible: true,
    binary: false,
    maxTextureSize: 4096,
    // exportScene1: exportScene1,
    // exportScenes: exportScenes,
    // exportSphere: exportSphere,
    // exportModel: exportModel,
    // exportObjects: exportObjects,
    // exportSceneObject: exportSceneObject,
    // exportCompressedObject: exportCompressedObject,
  };

  //   function exportGLTF(input: any) {
  //     const gltfExporter = new GLTFExporter();

  //     const options = {
  //       trs: params.trs,
  //       onlyVisible: params.onlyVisible,
  //       binary: params.binary, //대표님 저 다녀 오겠읍니다..! 푸시 하시면 안돼요! 아직 손볼 데가 많기 때문입니다 9ㅁ9!!! 😣😭😭
  //       // 뭐야 왜 운동을 늦게 간 거야.. ㅠ ㅠ
  //       //
  //       maxTextureSize: params.maxTextureSize
  //     };

  //     gltfExporter.parse(
  //       input,
  //       function (result) {
  //         if (result instanceof ArrayBuffer) {
  //           saveArrayBuffer(result, 'scene.glb');
  //         } else {
  //           const output = JSON.stringify(result, null, 2);
  //           //console.log(output);
  //           saveString(output, 'scene.gltf');
  //         }
  //       },
  //       function (error) {
  //         console.log('An error happened during parsing', error);
  //       },
  //       options
  //     );
  //   }

  interface Rectangle {
    id: string;
    x: number;
    y: number;
  }
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    // generate3DObject(selectedObjectType, newPosition);
    console.log("drop");
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    event.preventDefault();
  };
  const generate3DObject = (type: string, position: any) => {
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
    const newObjectSetting = {
      ...newObject_,
      color: "#00ffff",
      position: new THREE.Vector3(position.x, 0, 0),
    };
    // // setNewObject([...newObject, newObjectSetting]);
    addObject(newObjectSetting);
    console.log("newObjectSetting", newObjectSetting);
  };
  useEffect(() => {
    generate3DObject(selectedObjectType, newPosition);
  }, [selectedObjectType]);
  return (
    <>
      {/* <GenerateBox
        ref={draggableRef}
        draggable
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        Box
      </GenerateBox> */}
      <GenerateObject
        setNewPosition={setNewPosition}
        // handleMouseDown={handleMouseDown}
        // handleMouseUp={handleMouseUp}
        generate3DObject={generate3DObject}
        setSelectedObjectType={setSelectedObjectType}
      ></GenerateObject>
      {/* {threeSceneRef.current.children > 0 && (
        <ObjectList threeSceneRef={threeSceneRef}></ObjectList>
      )} */}
      {/* <div
        style={{
          width: "400px",
          height: "300px",
          backgroundColor: "#eee",
          border: "1px solid #ccc",
          position: "relative",
          margin: "20px",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></div> */}
      <Three_Canvas_6
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        threeCanvasRef={threeCanvasRef}
        threeCameraRef={threeCameraRef}
        threeRendererRef={threeRendererRef}
        threeSceneRef={threeSceneRef}
        generate3DObject={generate3DObject}
        objects={objects}
      ></Three_Canvas_6>
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
