//수정 할 것 많이 있어서 대표님 보시면 안되는 코드

import styled from "styled-components";

import { TbResize } from "react-icons/tb";
import { TbArrowsMove } from "react-icons/tb";
import { TbRotate360 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import { ToolbarData } from "../ToolbarData";
import { BsPaintBucket } from "react-icons/bs";
import { useEffect, useState } from "react";
import useObjectStore2 from "../../store/useObjectStore_v6";

const Toolbar_v2 = ({ test }: any) => {
  // const { state, actions } = useObjectStore2();
  // const [selectedMode, setSelectedMode] = useState<any>('translate');
  // const [positionInput, setPositionInput] = useState<any>({
  //   x: state.target.position.x,
  //   y: state.target.position.y,
  //   z: state.target.position.z
  // });
  // const modes = [
  //   {
  //     mode: 'translate',
  //     icon: <TbArrowsMove />
  //   },
  //   {
  //     mode: 'rotate',
  //     icon: <TbRotate360 />
  //   },
  //   {
  //     mode: 'scale',
  //     icon: <TbResize />
  //   }
  // ];
  // useEffect(() => {
  //   console.log(state.target, 'target');
  //   console.log(state.objects, 'objects');
  //   console.log(test, 'test');
  // }, [state.target.position]);

  //     {state.target != null && (
  //       <Container>
  //         <Top>
  //           <div>
  //             <h4>mode: {state.mode}</h4>
  //             <div>object: {state.target.name}</div>
  //           </div>

  //           <div
  //             style={{ fontSize: '2rem', cursor: 'pointer' }}
  //             onClick={() => {
  //               actions.setTarget(null);
  //             }}>
  //             <IoIosClose />
  //           </div>
  //         </Top>

  //         <Tools>
  //           <IconBox>
  //             {modes.map((item: any, index: any) => {
  //               return (
  //                 <Icons
  //                   key={index}
  //                   $bgColor={selectedMode === item.mode ? '#888' : 'transparent'}
  //                   onClick={() => {
  //                     setSelectedMode(item.mode);
  //                     actions.setMode(item.mode);
  //                   }}>
  //                   {item.icon}
  //                 </Icons>
  //               );
  //             })}
  //             <Icons
  //               $bgColor={selectedMode === 'color' ? '#888' : 'transparent'}
  //               onClick={() => {
  //                 setSelectedMode('color');
  //               }}>
  //               <BsPaintBucket />
  //             </Icons>
  //           </IconBox>

  //           {selectedMode == 'translate' && (
  //             <InputBox>
  //               <InputWrap>
  //                 <label htmlFor="xInput" style={{ color: '#f00' }}>
  //                   position.X:
  //                 </label>
  //                 <input
  //                   id="xInput"
  //                   name="x"
  //                   value={state.target.position.x}
  //                   onChange={(e) => {
  //                     const newPositionX = parseFloat(e.target.value);
  //                     if (!isNaN(newPositionX)) {
  //                       actions.setTarget({
  //                         ...state.target,
  //                         position: {
  //                           ...state.target.position,
  //                           x: newPositionX
  //                         }
  //                       });
  //                     }
  //                     console.log(state.target.position);
  //                   }}
  //                 />
  //               </InputWrap>
  //               <InputWrap>
  //                 <label htmlFor="yInput" style={{ color: '#00f' }}>
  //                   position.Y:
  //                 </label>
  //                 <input
  //                   id="yInput"
  //                   name="y"
  //                   value={positionInput.y}
  //                   onChange={(e) => {
  //                     setPositionInput({
  //                       ...positionInput,
  //                       y: e.target.value
  //                     });
  //                     const newPositionY = parseFloat(e.target.value);
  //                     if (!isNaN(newPositionY)) {
  //                       actions.setTarget({
  //                         ...state.target,
  //                         position: { x: state.target.position.x, y: newPositionY, z: state.target.position.z }
  //                       });
  //                     }
  //                   }}
  //                 />
  //               </InputWrap>
  //               <InputWrap>
  //                 <label htmlFor="zInput" style={{ color: '#0f0' }}>
  //                   position.Z:
  //                 </label>
  //                 <input
  //                   id="zInput"
  //                   name="z"
  //                   value={positionInput.z}
  //                   onChange={(e) => {
  //                     setPositionInput({
  //                       ...positionInput,
  //                       z: e.target.value
  //                     });
  //                     const newPositionZ = parseFloat(e.target.value);
  //                     if (!isNaN(newPositionZ)) {
  //                       actions.setTarget({
  //                         ...state.target,
  //                         position: { x: state.target.position.x, y: state.target.position.y, z: newPositionZ }
  //                       });
  //                     }
  //                   }}
  //                 />
  //               </InputWrap>
  //             </InputBox>
  //           )}

  //           {selectedMode === 'rotate' && (
  //             <InputBox>
  //               <InputWrap>
  //                 <label htmlFor="xInput">{selectedMode}.X:</label>
  //                 <input
  //                   id="xInput"
  //                   name="x"
  //                   value={state.target.rotation._x} // 현재 X 값 표시
  //                   onChange={(e: any) => {
  //                     actions.setTarget({
  //                       ...state.target,
  //                       rotation: [parseInt(e.target.value), state.target.rotation._y, state.target.rotation._z]
  //                     });
  //                   }}
  //                 />
  //               </InputWrap>
  //               <InputWrap>
  //                 <label htmlFor="yInput">rotation.Y:</label>
  //                 <input
  //                   id="yInput"
  //                   name="y"
  //                   value={state.target.rotation._y} // 현재 Y 값 표시
  //                   onChange={(e: any) => {
  //                     actions.setTarget({
  //                       ...state.target,
  //                       rotation: [state.target.rotation._x, parseInt(e.target.value), state.target.rotation._z]
  //                     });
  //                   }}
  //                 />
  //               </InputWrap>
  //               <InputWrap>
  //                 <label htmlFor="zInput">rotation.Z:</label>
  //                 <input
  //                   id="zInput"
  //                   name="z"
  //                   value={state.target.rotation._z} // 현재 Z 값 표시
  //                   onChange={(e: any) => {
  //                     actions.setTarget({
  //                       ...state.target,
  //                       rotation: [state.target.rotation._x, state.target.rotation._y, parseInt(e.target.value)]
  //                     });
  //                   }}
  //                 />
  //               </InputWrap>
  //             </InputBox>
  //           )}
  //           {selectedMode === 'scale' && (
  //             <InputBox>
  //               <InputWrap>
  //                 <label htmlFor="xInput">scale.X:</label>
  //                 <input
  //                   id="xInput"
  //                   name="x"
  //                   value={state.target.scale.x} /// 현재 X 값 표시
  //                   onChange={(e: any) => {
  //                     actions.setTarget({
  //                       ...state.target,
  //                       scale: { x: parseInt(e.target.value), y: state.target.scale.y, z: state.target.scale.z }
  //                     });
  //                     console.log(state.target.rotation);
  //                   }}
  //                 />
  //               </InputWrap>
  //               <InputWrap>
  //                 <label htmlFor="zInput">scale.Y:</label>
  //                 <input
  //                   id="zInput"
  //                   name="z"
  //                   value={state.target.scale.y} // 현재 Z 값 표시
  //                   onChange={(e: any) => {
  //                     actions.setTarget({
  //                       ...state.target,
  //                       scale: { x: state.target.scale.x, y: parseInt(e.target.value), z: state.target.scale.z }
  //                     });
  //                   }}
  //                 />
  //               </InputWrap>
  //               <InputWrap>
  //                 <label htmlFor="zInput">scale.Z:</label>
  //                 <input
  //                   id="zInput"
  //                   name="z"
  //                   value={state.target.scale.z} // 현재 Z 값 표시
  //                   onChange={(e: any) => {
  //                     actions.setTarget({
  //                       ...state.target,
  //                       scale: { x: state.target.scale.x, y: state.target.scale.y, z: parseInt(e.target.value) }
  //                     });
  //                   }}
  //                 />
  //               </InputWrap>
  //             </InputBox>
  //           )}
  //           {selectedMode === 'color' && (
  //             <InputBox>
  //               <InputWrap>
  //                 <label htmlFor="xInput">color:</label>
  //                 <input
  //                   type="text"
  //                   id="xInput"
  //                   name="x"
  //                   value={state.target.color}
  //                   onChange={(e: any) => {
  //                     actions.setTarget({
  //                       ...state.target,
  //                       color: e.target.value
  //                     });
  //                   }}
  //                 />
  //               </InputWrap>
  //             </InputBox>
  //           )}
  //         </Tools>
  //       </Container>
  //     )}
  return <></>;
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
  background-color: #888;
  border-radius: 5px;
  height: 12.1rem;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div<any>`
  width: 200px;

  background-color: #373c4b;

  font-size: 14px;

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
