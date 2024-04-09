import { Canvas } from "@react-three/fiber";
import { Children } from "react";
import * as THREE from "three";

const Canvas_v7 = ({
  threeCanvasRef,
  threeCameraRef,
  threeRendererRef,
  boxRef,
  threeSceneRef,
  findDragPosition,
  objectDrop,
  Children,
}: any) => {
  <Canvas
    ref={threeCanvasRef}
    gl={{ antialias: true }}
    style={{
      marginLeft: "50rem",
      width: "50%",
      height: "400px",
      border: "1px solid ivory",
    }}
    // onMouseMove={handleMouseMove}
    onCreated={({ camera, gl, scene }: any) => {
      threeCameraRef.current = camera;
      threeRendererRef.current = gl;
      threeSceneRef.current = scene;

      camera.lookAt(0, 0, 0);
      scene.background = new THREE.Color(0xeeeeee);
    }}
    onDragOver={findDragPosition}
    onDrop={objectDrop}
    onPointerMissed={() => {
      // console.log(null);
      boxRef.current = null;
    }}
  >
    {Children}
  </Canvas>;
};

export default Canvas_v7;
