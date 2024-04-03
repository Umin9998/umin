import styled from "styled-components";
import useObjectStore from "../store/ObjectStore";
import { TbResize } from "react-icons/tb";
import { TbArrowsMove } from "react-icons/tb";
import { TbRotate360 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import { ToolbarData } from "./ToolbarData";
import { BsPaintBucket } from "react-icons/bs";
import { useEffect, useState } from "react";

const Toolbar_v2 = () => {
  const { state, actions } = useObjectStore();
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [position, setPosition] = useState<any>([0, 0, 0]);
  const [rotation, setRotation] = useState<any>([0, 0, 0]);
  const [scale, setScale] = useState<any>([1, 1, 1]);
  const [bgColor, setBgColor] = useState<any>("#ccc");
  const [selectedMode, setSelectedMode] = useState<any>("translate");
  useEffect(() => {
    if (state.current === null) return;
    setPosition([
      state.current.position.x,
      state.current.position.y,
      state.current.position.z,
    ]);
    setRotation([
      state.current.rotation._x,
      state.current.rotation._y,
      state.current.rotation._z,
    ]);
    setScale([
      state.current.scale.x,
      state.current.scale.y,
      state.current.scale.z,
    ]);
  }, [state]);
  // useEffect(() => {
  //   // console.log("changed", position);
  //   // console.log("changed", rotation);
  //   // console.log("changed", scale);
  //   if (state.current === null) return;
  //   setPosition([
  //     state.current.position.x,
  //     state.current.position.y,
  //     state.current.position.z,
  //   ]);
  //   setRotation([
  //     state.current.rotation._x,
  //     state.current.rotation._y,
  //     state.current.rotation._z,
  //   ]);
  //   setScale([
  //     state.current.scale.x,
  //     state.current.scale.y,
  //     state.current.scale.z,
  //   ]);
  //   setColor(state.current.color);
  // }, [state]);
  return (
    <>
      {state.current != null && (
        <Container>
          <Top>
            <div>
              <h4>mode: {state.mode}</h4>
              <div>object: {state.current.name}</div>
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
                    $bgColor={
                      selectedMode === item.mode ? "#bbb" : "transparent"
                    }
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
              {/* <Icons
                $bgColor={selectedMode === "color" ? "#bbb" : "transparent"}
                onClick={() => {
                  setSelectedMode("color");
                }}
              >
                <BsPaintBucket />
              </Icons> */}
            </IconBox>
            {selectedMode === "translate" && (
              <InputBox>
                <InputWrap>
                  <label htmlFor="xInput">position.X:</label>
                  <input
                    id="xInput"
                    name="x"
                    value={position[0]} // 현재 X 값 표시
                    onChange={(e) => {
                      actions.setCurrent({
                        ...state.current,
                        position: [
                          parseFloat(e.target.value),
                          state.current.position._y,
                          state.current.position._z,
                        ],
                      });
                    }}
                  />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="yInput">position.Y:</label>
                  <input
                    id="yInput"
                    name="y"
                    value={position[1]} // 현재 Y 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        position: [
                          state.current.position._x,
                          parseInt(e.target.value),
                          state.current.position._z,
                        ],
                      });
                    }}
                  />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="zInput">position.Z:</label>
                  <input
                    id="zInput"
                    name="z"
                    value={position[2]} // 현재 Z 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        position: [
                          state.current.position._x,
                          state.current.position._y,
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
                    value={rotation[0]} // 현재 X 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        rotation: [
                          parseInt(e.target.value),
                          state.current.rotation._y,
                          state.current.rotation._z,
                        ],
                      });
                    }}
                  />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="yInput">rotation.Y:</label>
                  <input
                    id="yInput"
                    name="y"
                    value={rotation[1]} // 현재 Y 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        rotation: [
                          state.current.rotation._x,
                          parseInt(e.target.value),
                          state.current.rotation._z,
                        ],
                      });
                    }}
                  />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="zInput">rotation.Z:</label>
                  <input
                    id="zInput"
                    name="z"
                    value={rotation[2]} // 현재 Z 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        rotation: [
                          state.current.rotation._x,
                          state.current.rotation._y,
                          parseInt(e.target.value),
                        ],
                      });
                    }}
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
                    value={scale[0]} /// 현재 X 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        scale: [
                          parseInt(e.target.value),
                          state.current.scale.y,
                          state.current.scale.z,
                        ],
                      });
                      console.log(state.current.rotation);
                    }}
                  />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="zInput">scale.Y:</label>
                  <input
                    id="zInput"
                    name="z"
                    value={scale[1]} // 현재 Z 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        scale: [
                          state.current.scale.x,
                          parseInt(e.target.value),
                          state.current.scale.z,
                          ,
                        ],
                      });
                    }}
                  />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="zInput">scale.Z:</label>
                  <input
                    id="zInput"
                    name="z"
                    value={scale[2]} // 현재 Z 값 표시
                    onChange={(e: any) => {
                      actions.setCurrent({
                        ...state.current,
                        scale: [
                          state.current.scale.x,
                          state.current.scale.y,
                          parseInt(e.target.value),
                        ],
                      });
                    }}
                  />
                </InputWrap>
              </InputBox>
            )}
            {/* {selectedMode === "color" && (
              <InputBox>
                <InputWrap>
                  <label htmlFor="xInput">color:</label>
                  <input
                    type="text"
                    id="xInput"
                    name="x"
                    value={state.current.color}
                    onChange={(e: any) => {
                      actions.setColor(e.target.value);
                    }}
                  />
                </InputWrap>
              </InputBox>
            )} */}
          </Tools>
        </Container>
      )}
    </>
  );
};

export default Toolbar_v2;

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
