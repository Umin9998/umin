'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from 'three';

const BoxTest = () => {
  //const fileUrl = '/p003_polyade/assets/test/shiba/scene.gltf';
  //const mesh = useRef<Mesh>(null!);
  //   const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    //mesh.current.rotation.x += 0.01;
    //mesh.current.rotation.y += 0.01;
  });

  return (
    <>
      {/* <mesh ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh> */}
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={0x0000ff} />
      </mesh>
    </>
  );
};

export default BoxTest;
