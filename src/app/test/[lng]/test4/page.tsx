"use client";
import { Canvas, act, useFrame } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import Box from "./comp/Box";
import useKeyboard from "../test3/customs/useKeyboard";
import "./styles.css";
import { Suspense, useEffect, useState } from "react";
import ObjectTest from "./comp/ObjectTest";
import Controls from "./comp/Controls";
import styled from "styled-components";
import useObjectStore from "./store/ObjectStore";
import TransformContext from "./comp/TransformContext";
import { parse } from "path";
// <StrictMode> lets you find common bugs in your components early during development.
// Use StrictMode to enable additional development behaviors and warnings for the component tree inside
// https://react.dev/reference/react/StrictMode
// reactStrictMode: true, in next.config.js

export default function Page() {
  const keyMap = useKeyboard();
  const [selected, setSelected] = useState("");
  const { state, actions } = useObjectStore();
  //const { myValue } = useControls({ myValue: 10 });
  //const { name, aNumber } = useControls({ name: 'World', aNumber: 0 });
  const editableState = "./editableState.js";
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [displayTransform, setDisplayTransform] = useState(false);
  const handleContextMenu = () => {};
  const [position, setPosition] = useState({ x: 1, y: 1, z: 1 });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // 입력된 값으로 position 객체 업데이트
    setPosition({
      ...position,
      [name]: parseFloat(value), // 입력값은 문자열이므로 숫자로 변환하여 저장
    });
  };
  useEffect(() => {
    console.log(position);
  }, [position]);
  return (
    <>
      {state.current && (
        <ContextMenu>
          <h4>Transform Mode</h4>
          <div>opject:{state.current.name}</div>
          <ul>
            <li
              onClick={() => {
                actions.setMode("translate");
                setMenuPos(null);
              }}
            >
              translate
              <div>
                <label htmlFor="xInput">X:</label>
                <input
                  type="number"
                  id="xInput"
                  name="x"
                  value={state.current.position.x} // 현재 X 값 표시
                  onChange={handleInputChange} // 입력값 변경 핸들러 호출
                />

                <label htmlFor="yInput">Y:</label>
                <input
                  type="number"
                  id="yInput"
                  name="y"
                  value={state.current.position.y} // 현재 Y 값 표시
                  onChange={handleInputChange} // 입력값 변경 핸들러 호출
                />

                <label htmlFor="zInput">Z:</label>
                <input
                  type="number"
                  id="zInput"
                  name="z"
                  value={state.current.position.z} // 현재 Z 값 표시
                  onChange={handleInputChange} // 입력값 변경 핸들러 호출
                />
              </div>
            </li>

            <li
              onClick={() => {
                actions.setMode("rotate");
                setMenuPos(null);
              }}
            >
              rotate
            </li>
            <li
              onClick={() => {
                actions.setMode("scale");
                setMenuPos(null);
              }}
            >
              scale
            </li>
          </ul>
        </ContextMenu>
      )}
      <Canvas
        camera={{ position: [20, 10, 5] }}
        onClick={() => {
          setMenuPos(null);
        }}
      >
        <ambientLight intensity={Math.PI / 3} color="#fff" />

        <spotLight distance={20} intensity={Math.PI / 5} color="#fff" />

        <Box
          setMenuPos={setMenuPos}
          handleContextMenu={handleContextMenu}
          name="pink"
          position={[position.x, position.y, position.z]}
          color="hotpink"
        />

        <gridHelper />
        <Controls />
      </Canvas>
    </>
  );
}
const ContextMenu = styled.div<any>`
  position: absolute;
  top: 20px;
  left: 20px;
  //background-color: #f0f0f0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-family: sans-serif;
  font-size: 14px;
  z-index: 1000;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & li {
    padding: 8px 10px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
      border-radius: 5px;
    }
  }
`;
