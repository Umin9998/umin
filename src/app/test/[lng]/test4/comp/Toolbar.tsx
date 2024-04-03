import styled from "styled-components";
import useObjectStore from "../store/ObjectStore";
import { TbResize } from "react-icons/tb";
import { TbArrowsMove } from "react-icons/tb";
import { TbRotate360 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import { ToolbarData } from "./ToolbarData";
import { BsPaintBucket } from "react-icons/bs";
import { useEffect, useState } from "react";

const Toolbar = (BoxRef: any) => {
  const { state, actions } = useObjectStore();
  const [selectedObject, setSelectedObject] = useState<any>(null);

  const [selectedMode, setSelectedMode] = useState<any>("translate");
  useEffect(() => {
    console.log(BoxRef.BoxRef.current);
  }, [BoxRef.BoxRef.current]);
  return (
    <>
      <Container>
        <Top>
          <div>
            <h4>mode: {state.mode}</h4>
            <div>object: {BoxRef.BoxRef.current.name}</div>
          </div>

          <div
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={() => {
              actions.setCurrent(null);
            }}
          >
            <IoIosClose />
          </div>
        </Top>

        <Tools>
          <IconBox>
            {ToolbarData.map((item, index) => {
              return (
                <Icons
                  $bgColor={selectedMode === item.mode ? "#bbb" : "transparent"}
                  key={index}
                  onClick={() => {
                    actions.setMode(item.mode);
                    setSelectedMode(item.mode);
                  }}
                >
                  <div>
                    {item.title === "Position" && <TbArrowsMove />}
                    {item.title === "Rotate" && <TbRotate360 />}
                    {item.title === "Scale" && <TbResize />}
                  </div>
                </Icons>
              );
            })}
            <Icons
              $bgColor={selectedMode === "color" ? "#bbb" : "transparent"}
              onClick={() => {
                setSelectedMode("color");
              }}
            >
              <BsPaintBucket />
            </Icons>
          </IconBox>
          {selectedMode === "translate" && (
            <InputBox>
              <InputWrap>
                <label htmlFor="xInput">position.X:</label>
                <input
                  id="xInput"
                  name="x"
                  value={BoxRef.BoxRef.current.position.x.toFixed(2)} // 현재 X 값 표시
                  onChange={(e: any) => {
                    console.log(e.target.value, "changed");
                    actions.setCurrent({
                      ...state.current,
                      position: [
                        parseInt(e.target.value),
                        BoxRef.BoxRef.current.position._y,
                        BoxRef.BoxRef.current.position._z,
                      ],
                    });
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
              <InputWrap>
                <label htmlFor="yInput">position.Y:</label>
                <input
                  id="yInput"
                  name="y"
                  value={BoxRef.BoxRef.current.position.y.toFixed(2)} // 현재 Y 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      position: [
                        BoxRef.BoxRef.current.position._x,
                        parseInt(e.target.value),
                        BoxRef.BoxRef.current.position._z,
                      ],
                    });
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
              <InputWrap>
                <label htmlFor="zInput">position.Z:</label>
                <input
                  id="zInput"
                  name="z"
                  value={BoxRef.BoxRef.current.position.z.toFixed(2)} // 현재 Z 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      position: [
                        BoxRef.BoxRef.current.position._x,
                        BoxRef.BoxRef.current.position._y,
                        parseInt(e.target.value),
                      ],
                    });
                  }} // 입력값
                />
              </InputWrap>
            </InputBox>
          )}
          {selectedMode === "rotate" && (
            <InputBox>
              <InputWrap>
                <label htmlFor="xInput">{selectedMode}.X:</label>
                <input
                  id="xInput"
                  name="x"
                  value={BoxRef.BoxRef.current.rotation.x.toFixed(2)} // 현재 X 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      rotation: [
                        parseInt(e.target.value),
                        BoxRef.BoxRef.current.rotation._y,
                        BoxRef.BoxRef.current.rotation._z,
                      ],
                    });
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
              <InputWrap>
                <label htmlFor="yInput">rotation.Y:</label>
                <input
                  id="yInput"
                  name="y"
                  value={BoxRef.BoxRef.current.rotation.y.toFixed(2)} // 현재 Y 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      rotation: [
                        BoxRef.BoxRef.current.rotation._x,
                        parseInt(e.target.value),
                        BoxRef.BoxRef.current.rotation._z,
                      ],
                    });
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
              <InputWrap>
                <label htmlFor="zInput">rotation.Z:</label>
                <input
                  id="zInput"
                  name="z"
                  value={BoxRef.BoxRef.current.rotation.z.toFixed(2)} // 현재 Z 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      rotation: [
                        BoxRef.BoxRef.current.rotation._x,
                        BoxRef.BoxRef.current.rotation._y,
                        parseInt(e.target.value),
                      ],
                    });
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
            </InputBox>
          )}
          {selectedMode === "scale" && (
            <InputBox>
              <InputWrap>
                <label htmlFor="xInput">scale.X:</label>
                <input
                  id="xInput"
                  name="x"
                  value={BoxRef.BoxRef.current.scale.x.toFixed(2)} /// 현재 X 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      scale: [
                        parseInt(e.target.value),
                        BoxRef.BoxRef.current.scale.y,
                        BoxRef.BoxRef.current.scale.z,
                      ],
                    });
                    console.log(BoxRef.BoxRef.current.rotation);
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
              <InputWrap>
                <label htmlFor="zInput">scale.Y:</label>
                <input
                  id="zInput"
                  name="z"
                  value={BoxRef.BoxRef.current.scale.y.toFixed(2)} // 현재 Z 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      scale: [
                        BoxRef.BoxRef.current.scale.x,
                        parseInt(e.target.value),
                        BoxRef.BoxRef.current.scale.z,
                        ,
                      ],
                    });
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
              <InputWrap>
                <label htmlFor="zInput">scale.Z:</label>
                <input
                  id="zInput"
                  name="z"
                  value={BoxRef.BoxRef.current.scale.z.toFixed(2)} // 현재 Z 값 표시
                  onChange={(e: any) => {
                    actions.setCurrent({
                      ...state.current,
                      scale: [
                        BoxRef.BoxRef.current.scale.x,
                        BoxRef.BoxRef.current.scale.y,
                        parseInt(e.target.value),
                      ],
                    });
                  }} // 입력값 변경 핸들러 호출
                />
              </InputWrap>
            </InputBox>
          )}
          {selectedMode === "color" && (
            <InputBox>
              <InputWrap>
                <label htmlFor="xInput">color:</label>
                <input
                  type="text"
                  id="xInput"
                  name="x"
                  value={
                    BoxRef.BoxRef.current.color.includes("#")
                      ? BoxRef.BoxRef.current.color
                      : `#${BoxRef.BoxRef.current.color}`
                  }
                  onChange={(e: any) => {
                    console.log(BoxRef.BoxRef.current.color);
                  }}
                />
              </InputWrap>
            </InputBox>
          )}
        </Tools>

        {/* <ul>
          <li
            onClick={() => {
              actions.setMode("translate");
            }}
          >
            translate
            <div>
              <label htmlFor="xInput">X:</label>
              <input
              
                id="xInput"
                name="x"
                value={BoxRef.BoxRef.current.position.x} // 현재 X 값 표시
                onChange={()=>{
                  console.log('changed')
                }} // 입력값 변경 핸들러 호출
              />
              <label htmlFor="yInput">Y:</label>
              <input
              
                id="yInput"
                name="y"
                value={BoxRef.BoxRef.current.position.y} // 현재 Y 값 표시
                onChange={()=>{
                  console.log('changed')
                }} // 입력값 변경 핸들러 호출
              />
              <label htmlFor="zInput">Z:</label>
              <input
              
                id="zInput"
                name="z"
                value={BoxRef.BoxRef.current.position.z} // 현재 Z 값 표시
                onChange={()=>{
                  console.log('changed')
                }} // 입력값 변경 핸들러 호출
              />
            </div>
          </li>
          <li
            onClick={() => {
              actions.setMode("rotate");
            }}
          >
            rotate
          </li>
          <li
            onClick={() => {
              actions.setMode("scale");
            }}
          >
            scale
          </li>
        </ul> */}
      </Container>
    </>
  );
};

export default Toolbar;

const IconBox = styled.ul<any>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  height: 100%;
  padding-top: 0.5rem;
`;
const Icons = styled.li<any>`
  transform: translateY(2px) scale(1.2);
  border-radius: 5px 0 0 5px;
  background-color: ${(props) => props.$bgColor};
  padding: 0.5rem;
`;
const InputBox = styled.ul<any>`
  width: 100%;

  padding: 0.5rem;
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 1.5rem;
  background-color: #bbb;
  border-radius: 5px;
  height: 12.1rem;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div<any>`
  width: 200px;

  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  font-size: 14px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h4 {
    text-transform: capitalize;
  }
  ul {
    list-style: none;
  }
  // > ul {

  //   > li {
  //     display: flex;

  //     align-items: center;
  //     gap: 5px;
  //     padding: 8px 10px;
  //     cursor: pointer;

  //     &:hover {
  //       background-color: #ddd;
  //       border-radius: 5px;
  //     }
  //     ul {
  //       display: flex;
  //       gap: 5px;
  //       flex-direction: column;
  //     }
  //   }
  // }
`;

const InputWrap = styled.li<any>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  input {
    border-radius: 5px;
    width: 50%;
    padding: 0.5rem;
  }
`;

const Tools = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;
