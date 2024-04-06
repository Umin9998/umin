import styled from 'styled-components';

import useObjectStoresWithActions from '../store/useObjectStore_v6';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import GenerateObject from './editor/GenerateObject';
import Three_Canvas from './editor/Three_Canvas';
import Toolbar_v3 from './editor/Toolbar_v3';
import { act } from '@react-three/fiber';
import useObjectStore from '../store/useObjectStore_v5';
const ThreeWindow_v3 = () => {
  const { objects, addObject, selectObject, setMode, updateObject } = useObjectStoresWithActions(); // useObjectStoresWithActions 훅 사용
  const { data, addThreeObject } = useObjectStore();
  const [newObject, setNewObject] = useState<any>([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 }); // 인풋 값의 상태
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 }); // 인풋 값의 상태
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 }); // 인풋 값의 상태
  const [newGeometry, setNewGeometry] = useState<any>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate3DObject = (type: string) => {
    if (type === 'box') {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial();
      const newObject_ = new THREE.Mesh(geometry, material);
      console.log(newObject_, 'newObject_');
      console.log(newObject, 'newObject');
      setNewObject([...newObject, newObject_]);
      addThreeObject(newObject_);
    }
  };
  useEffect(() => {
    console.log(data);
  }, [newObject]);
  const handleObjectChange = (e: any) => {
    setPosition({
      x: e.target.object.position.x,
      y: e.target.object.position.y,
      z: e.target.object.position.z
    });
    setRotation({
      x: e.target.object.rotation.x,
      y: e.target.object.rotation.y,
      z: e.target.object.rotation.z
    });
    setScale({
      x: e.target.object.scale.x,
      y: e.target.object.scale.y,
      z: e.target.object.scale.z
    });
  };
  const handlePositionChange = (e: any) => {
    setPosition({
      x: e.target.object.position.x,
      y: e.target.object.position.y,
      z: e.target.object.position.z
    });
  };
  const handleRotationChange = (e: any) => {
    setRotation({
      x: e.target.object.rotation.x,
      y: e.target.object.rotation.y,
      z: e.target.object.rotation.z
    });
  };
  const handleScaleChange = (e: any) => {
    setScale({
      x: e.target.object.scale.x,
      y: e.target.object.scale.y,
      z: e.target.object.scale.z
    });
  };

  return (
    <>
      <Container>
        <Three_Canvas handleObjectChange={handleObjectChange} objects={objects} canvasRef={canvasRef}></Three_Canvas>
        <GenerateObject generate3DObject={generate3DObject}></GenerateObject>
        <Toolbar_v3
          handlePositionChange={handlePositionChange}
          handleRotationChange={handleRotationChange}
          handleScaleChange={handleScaleChange}
          position={position}
          rotation={rotation}
          scale={scale}
        />
      </Container>
    </>
  );
};

export default ThreeWindow_v3;
const Container = styled.div`
  border: 1px solid #0ff;
`;
