import exp from "constants";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Three_Canvas_6 from "./Three_Canvas_6";
import * as THREE from "three";
import useObjectStore_v6 from "./useObjectStore_v6";
import GenerateObject from "./GenerateObject";
import ObjectList from "./ObjectList";

const TestComp = () => {
  const { objects, addObject, selectObject, setMode, clearObjects } =
    useObjectStore_v6();
  const [link, setLink] = useState<HTMLAnchorElement | null>(null);
  const threeCanvasRef = useRef<any>();
  const threeCameraRef = useRef<any>();
  const threeRendererRef = useRef<any>();
  const threeSceneRef = useRef<any>();
  const boxRef = useRef<any>(null);
  const threeMouseRef = useRef<any>(null);
  const threeRaycaster = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [selectedObjectType, setSelectedObjectType] = useState<string>("");
  const [create, setCreate] = useState("click");
  useEffect(() => {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594
    setLink(link);

    if (threeCanvasRef.current) {
      console.log("threeCanvasRef.current", threeCanvasRef.current);
    }
  }, [threeCanvasRef.current]);

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
  // const generate3DObject = (type: string) => {
  //   let geometry;

  //   switch (type) {
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

  //   const material = new THREE.MeshStandardMaterial();
  //   //const newObject_ = new THREE.Mesh(geometry);

  //   const plane = new THREE.Mesh(geometry, material);

  //   threeSceneRef.current.add(plane);
  // };
  // const handleDrop = (event: any) => {
  //   event.preventDefault();
  //   const text = event.dataTransfer.getData("text/plain");
  //   const { clientX, clientY } = event;
  //   const canvas = document.getElementById("canvas");
  //   const canvasRect = threeCanvasRef.current.getBoundingClientRect();
  //   const mouse = new THREE.Vector2(
  //     ((clientX - canvasRect.left) / threeCanvasRef.current.clientWidth) * 2 - 1,
  //     -((clientY - canvasRect.top) / threeCanvasRef.current.clientHeight) * 2 + 1
  //   );
  //   const raycaster = new THREE.Raycaster();
  //   raycaster.setFromCamera(mouse, threeCameraRef.current);

  //   const intersects = raycaster.intersectObjects(threeSceneRef.current.children);
  //   if (intersects.length > 0) {
  //     const position = intersects[0].point;
  //     threeSceneRef.current.add(<Box position={[position.x, position.y, position.z]} />);
  //   }
  // };
  const generate3DObject = (type: string, newposition: any, test: string) => {
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
    if (test === "click") {
      const material = new THREE.MeshStandardMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      if (mesh) {
        mesh.position.set(0, 0, 0); // 새로운 포지션 설정
        threeSceneRef.current.children.push(mesh); // 씬에 메쉬 추가
      }
    } else if (test === "drag") {
      const material = new THREE.MeshStandardMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      if (mesh) {
        mesh.position.set(newposition.x, newposition.y, newposition.z); // 새로운 포지션 설정
        threeSceneRef.current.children.push(mesh); // 씬에 메쉬 추가
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    // const type = event.dataTransfer.getData("text/plain");

    const { clientX, clientY } = event;
    const canvasRect = threeCanvasRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((clientX - canvasRect.left) / threeCanvasRef.current.clientWidth) * 2 -
        1,
      -((clientY - canvasRect.top) / threeCanvasRef.current.clientHeight) * 2 +
        1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, threeCameraRef.current);

    const intersects = raycaster.intersectObjects(
      threeSceneRef.current.children
    );
    if (intersects.length > 0 && selectedObjectType) {
      const position = intersects[0].point;

      console.log("drop", position);
    }
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  const handleClicked = (type: string) => {
    generate3DObject(type, { x: 0, y: 0, z: 0 }, "click");
  };

  return (
    <>
      <GenerateObject
        threeSceneRef={threeSceneRef}
        threeRaycaster={threeRaycaster}
        click={handleClicked}
        setCreate={setCreate}
        setSelectedObjectType={setSelectedObjectType}
      ></GenerateObject>
      {threeCanvasRef.current && (
        <ObjectList boxRef={boxRef} threeSceneRef={threeSceneRef} />
      )}
      <Three_Canvas_6
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        create={generate3DObject}
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
