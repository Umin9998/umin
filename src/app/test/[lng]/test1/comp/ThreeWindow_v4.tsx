'use client';

import React, { use, useEffect, useRef } from 'react';

import * as THREE from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

import styled from 'styled-components';

// https://github.com/bokuweb/react-rnd
// https://bokuweb.github.io/react-rnd/stories
import { Rnd } from 'react-rnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { faXmark, faArrowDown, faDownload } from '@fortawesome/free-solid-svg-icons';

import ThreeContainer from './ThreeContainer';
import Three_Canvas_6 from './editor/Three_Canvas_6';

const Icon = styled(FontAwesomeIcon)`
  //position: absolute;
  color: #dbff00; /* Arrow color */
  font-size: 1.5rem;

  &.icon-flipped {
    transform: scaleX(-1);
  }
`;

const CustomResizeHandle = () => {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        opacity: 0,
        background: '#000000',
        position: 'absolute',
        borderRadius: '0 0 10px 0',
        right: 10,
        bottom: -70,
        cursor: 'nwse-resize' // Diagonal resize cursor
      }}>
      {/* You can add an icon or any other custom content here */}
    </div>
  );
};

const CloseHandle = () => {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        opacity: 0,
        background: '#000000',
        position: 'absolute',
        borderRadius: '0 0 10px 0',
        right: 10,
        bottom: -20,
        cursor: 'close'
      }}></div>
  );
};

const ThreeWindow_v4 = ({ handleClose }: any) => {
  const [size, setSize] = React.useState({ width: '640px', height: '480px' });
  const [position, setPosition] = React.useState({ x: 300, y: 300 });
  const [link, setLink] = React.useState<HTMLAnchorElement | null>(null);

  const parentRef = useRef<any>();
  const childRef = useRef<any>();
  const handleRef = useRef<any>();

  const threeCanvasRef = useRef<any>();
  const threeCameraRef = useRef<any>();
  const threeRendererRef = useRef<any>();
  const threeSceneRef = useRef<any>();

  useEffect(() => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link); // Firefox workaround, see #6594
    setLink(link);

    if (threeCanvasRef.current) {
      console.log('threeCanvasRef.current', threeCanvasRef.current);
    }
  }, [threeCanvasRef.current]);

  const handleExport = () => {
    console.log('handleExport');

    if (threeSceneRef.current) {
      //const geometry = new THREE.BufferGeometry();
      const geometries: any[] = [];

      threeSceneRef.current.traverse(function (child: any) {
        if (child.isMesh) {
          child.updateMatrix(); // Important

          geometries.push(child.geometry.clone().applyMatrix4(child.matrix));
          //geometries.push(child.geometry.clone());
          //geometries.push(child.geometry);
        }
      });
      // Merge the geometries into a single BufferGeometry
      const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries, false);
      //const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);

      //const geometry = new THREE.BufferGeometry().fromGeometry(threeSceneRef.current

      console.log('mergedGeometry', mergedGeometry);

      // Step 2: Export to GLTF
      // https://threejs.org/docs/?q=GLTFExporter#examples/en/exporters/GLTFExporter
      //const exporter = new GLTFExporter();
      //const fbx = exporter.parse(mergedMesh);

      // Parse the input and generate the glTF output
      // exporter.parse(
      //   threeSceneRef.current,
      //   //mergedGeometry,
      //   // called when the gltf has been generated
      //   function (gltf) {
      //     console.log(gltf);
      //     //downloadJSON( gltf );
      //   },
      //   // called when there is an error in the generation
      //   function (error) {
      //     console.log('An error happened');
      //   }
      //   //options
      // );

      exportGLTF(threeSceneRef.current);
    }
  };

  function save(blob: any, filename: any) {
    if (link === null) return;

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // URL.revokeObjectURL( url ); breaks Firefox...
  }

  function saveString(text: any, filename: any) {
    save(new Blob([text], { type: 'text/plain' }), filename);
  }

  function saveArrayBuffer(buffer: any, filename: any) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
  }

  const params = {
    trs: false,
    onlyVisible: true,
    binary: false,
    maxTextureSize: 4096
    // exportScene1: exportScene1,
    // exportScenes: exportScenes,
    // exportSphere: exportSphere,
    // exportModel: exportModel,
    // exportObjects: exportObjects,
    // exportSceneObject: exportSceneObject,
    // exportCompressedObject: exportCompressedObject,
  };

  function exportGLTF(input: any) {
    const gltfExporter = new GLTFExporter();

    const options = {
      trs: params.trs,
      onlyVisible: params.onlyVisible,
      binary: params.binary, //대표님 저 다녀 오겠읍니다..! 푸시 하시면 안돼요! 아직 손볼 데가 많기 때문입니다 9ㅁ9!!! 😣😭😭
      // 뭐야 왜 운동을 늦게 간 거야.. ㅠ ㅠ
      //
      maxTextureSize: params.maxTextureSize
    };

    gltfExporter.parse(
      input,
      function (result) {
        if (result instanceof ArrayBuffer) {
          saveArrayBuffer(result, 'scene.glb');
        } else {
          const output = JSON.stringify(result, null, 2);
          //console.log(output);
          saveString(output, 'scene.gltf');
        }
      },
      function (error) {
        console.log('An error happened during parsing', error);
      },
      options
    );
  }

  return (
    <Rnd
      ref={parentRef}
      dragHandleClassName="my-drag-handle" // Users will be able to drag the react-rnd component only when they click and drag from this specified area.
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      resizeHandleComponent={{
        bottomRight: <CustomResizeHandle /> // Use custom component for the bottom-right handle
      }}
      enableResizing={{
        top: false, // Prevent resizing from the top
        right: true,
        bottom: true,
        left: true,
        topRight: false,
        bottomRight: true,
        bottomLeft: true,
        topLeft: false // Optionally, prevent resizing from the top-left corner as well
      }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResize={(e, direction, ref, delta, position) => {
        handleRef.current.style.width = ref.style.width;
        handleRef.current.style.height = '40px';

        if (threeCameraRef.current) {
          const width_ = parseInt(ref.style.width, 10);
          const height_ = parseInt(ref.style.height, 10);

          threeCameraRef.current.aspect = width_ / height_;
          threeCameraRef.current.updateProjectionMatrix();

          threeRendererRef.current.setSize(width_, height_);
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
          ...position
        });

        handleRef.current.style.width = ref.style.width;
        handleRef.current.style.height = '40px';
      }}>
      {/* <BlocklyTestWrapper ref={childRef}> */}
      {/* Drag Handle Area */}
      <Handle ref={handleRef} className="my-drag-handle top">
        <div>Drag from here</div>
        <div style={{ display: 'flex' }}>
          <ExportButton onClick={handleExport}>
            <Icon icon={faDownload} />
          </ExportButton>
          <CloseButton onClick={handleClose}>
            <Icon icon={faXmark} />
          </CloseButton>
        </div>
      </Handle>
      {/* Non-draggable Content Area */}

      <ThreeContainer
        threeCanvasRef={threeCanvasRef}
        threeCameraRef={threeCameraRef}
        threeRendererRef={threeRendererRef}
        threeSceneRef={threeSceneRef}
      />
      {/* </BlocklyTestWrapper> */}
      <Handle ref={handleRef} className="my-drag-handle bottom">
        <div>Drag from here</div>
        <div>
          <Icon icon={faUpRightAndDownLeftFromCenter} className={'icon-flipped'} />
        </div>
      </Handle>
    </Rnd>
  );
};

export default ThreeWindow_v4;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 1rem;
  cursor: move;
  background: #aaa;
  //border: 1px solid #000;
  //border-radius: 10px 10px 0 0;

  &.top {
    border-radius: 10px 10px 0 0;
  }

  &.bottom {
    border-radius: 0 0 10px 10px;
  }
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #aaa;
  width: 40px;
  height: 40px;
  transform: translateX(10px);
  border-radius: 0 10px 0 0;
`;

const ExportButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #aaa;
  width: 40px;
  height: 40px;
  transform: translateX(10px);
  border-radius: 0 10px 0 0;
`;
