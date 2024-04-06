"use client";

import React, { useEffect, useRef, useState, useMemo, memo } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";

import * as THREE from "three";

const Three_Canvas_6 = ({
  threeCanvasRef,
  threeCameraRef,
  threeSceneRef,
  threeRaycaster,
  handleDrop,
  handleDragOver,
}: any) => {
  useEffect(() => {
    // Three.js의 scene 객체 생성
    threeSceneRef.current = new THREE.Scene();

    // Three.js의 raycaster 객체 생성
    threeRaycaster.current = new THREE.Raycaster();
    threeCameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Three.js 객체가 초기화된 후에 호출되는 코드
    // 여기에서 Three.js 객체를 직접 조작할 수 있습니다.
    // 예를 들어, threeRaycaster.current를 업데이트하거나 sceneRef.current에 객체를 추가할 수 있습니다.
  }, []);
  // const handleMouseMove = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   if (!threeRaycaster.current || !threeSceneRef.current) return;

  //   // 마우스 이벤트를 이용하여 raycaster를 업데이트하고 씬 객체와의 교차점을 확인할 수 있습니다.
  //   const mouse = new THREE.Vector2(
  //     (event.clientX / window.innerWidth) * 2 - 1,
  //     -(event.clientY / window.innerHeight) * 2 + 1
  //   );
  //   threeRaycaster.current.setFromCamera(mouse, threeCameraRef.current);
  //   console.log(mouse, "mouse");
  //   const intersects = threeRaycaster.current.intersectObjects(
  //     threeSceneRef.current.children
  //   );

  // };

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        ref={threeCanvasRef}
        gl={{ antialias: true }}
        style={{
          marginLeft: "50rem",
          width: "50%",
          height: "400px",
          backgroundColor: "#373C4B",
          pointerEvents: "auto",
        }}
        // onMouseMove={handleMouseMove}
        onCreated={({ camera }: any) => {
          camera.lookAt(0, 0, 0);
          threeCameraRef.current = camera;
        }}
        onDrop={(event) => {
          console.log("onDrop");
          handleDrop(event);
        }}
        onDragOver={handleDragOver}
      >
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Shadows />
        <OrbitControls makeDefault />
        <gridHelper args={[20]} />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
        {/* //onPointerMissed={() => {
        //   selectObject(null);
        // }}
        // onCreated={({ camera, gl, scene, raycaster, event }: any) => {
        //   threeCameraRef.current = camera;
        //   threeRendererRef.current = gl;
        //   threeSceneRef.current = scene;
        //   threeMouseRef.current = event;

        //   camera.lookAt(0, 0, 0);
        // }}
        // onPointerDown={(event: any) => {
        //   handleMouseDown(event);
        // }}
        // onMouseMove={(e: any) => {
        //   console.log("onMouseMove");
        //   console.log(e.clientX);
        //   console.log(e.clientY);
        // }}
      
       

       {threeSceneRef.current &&
          threeSceneRef.current.children.map((object: any, index: any) => {
            console.log(object, "object");
            const mesh = object.children.filter(
              (child: any) => child.type === "Mesh"
            );
            console.log(mesh, "mesh");
            return (
              <ThreeObject
                key={index}
                item={object}
                onControlEnd={onControlEnd}
                onControlStart={onControlStart}
                boxRef={boxRef}
                setHover={setHover}
              />
            );
          })} */}
      </Canvas>
    </>
  );
};

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));

Shadows.displayName = "Shadows";

export default Three_Canvas_6;
