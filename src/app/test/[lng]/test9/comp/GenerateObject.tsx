import styled from "styled-components";
import { IoCubeOutline } from "react-icons/io5";
import { TbCone } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { TbCylinder } from "react-icons/tb";
import { TbCapsule } from "react-icons/tb";
import { GiDonut } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import * as THREE from "three";
import useObjectStore_v6 from "./useObjectStore_v6";
import { add } from "algebra-lib";
const GenerateObject = ({
  threeSceneRef,
  threeRaycaster,
  setSelectedObjectType,
  click,
  setCreate,
}: any) => {
  const [time, setTime] = useState(false);
  const [threeDisplay, setThreeDisplay] = useState(false);
  const [startTime, setStartTime] = useState<any>();
  const [newObject, setNewObject] = useState<any>([]);
  //const draggableRef = useRef<HTMLDivElement>(null);
  const { addObject } = useObjectStore_v6();
  const icons = [
    { type: "Cube", icon: <IoCubeOutline /> },
    { type: "Cone", icon: <TbCone /> },
    { type: "Sphere", icon: <FaRegCircle /> },
    { type: "Cylinder", icon: <TbCylinder /> },
    { type: "Capsule", icon: <TbCapsule /> },
    { type: "Donut", icon: <GiDonut /> },
  ];
  // const handleDragStart = (
  //   event: React.DragEvent<HTMLDivElement>,
  //   type: any
  // ) => {
  //   // event.dataTransfer.setData("text/plain", "");
  //   console.log("dragstart", type);
  //   setSelectedObjectType(type);
  // };
  // const bind = useGesture({
  //   onDrag: ({ offset: [x, y] }) => {
  //     setNewPosition({ x: x, y: 0, z: 0 });
  //   },
  // });

  // const handleMouseDown = () => {
  //   const startTime_ = Date.now();
  //   const startDate = new Date(startTime_);
  //   setStartTime(startDate);
  //   setTimeout(() => {
  //     setTime(true); // 0.5초 후에 time 상태 업데이트
  //   }, 500);
  //   return setTime(false);
  // };
  // const handleMouseUp = () => {
  //   if (time == true) {
  //     console.log("이건 드래그예용");
  //   } else {
  //     console.log("이건 클릭");
  //     setThreeDisplay(true);
  //   }
  // };

  return (
    <Container>
      {/* {state.target !== null && <Toolbar_v2 />} */}
      {icons.map((object, index) => {
        return (
          <GenerateIcon
            key={index}
            // {...bind()}
            //ref={draggableRef}
            draggable
            onClick={() => {
              setSelectedObjectType(object.type);
              setCreate("click");
              console.log("click");
            }}
            onDragStart={() => {
              setSelectedObjectType(object.type);
              setCreate("drag");
              console.log("drag");
            }}
            // onDragEnd={(e: any) => {
            //   generate3DObject(object.type);
            // }}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
          >
            <div className="icon">{object.icon}</div>
            <div className="text">{object.type}</div>
          </GenerateIcon>
        );
      })}
      {/* <GenerateIcon
        onClick={() => {
          generate3DObject();
        }}>
        <IoCubeOutline />
        <div>Cube</div>
      </GenerateIcon>
      <GenerateIcon
        onClick={() => {
          console.log('clciked'); 
        }}>
        <TbCone />
        <div>Cone</div>
      </GenerateIcon>{' '} */}
    </Container>
  );
};

export default GenerateObject;

const Container = styled.div`
  display: flex;
  color: #e4e4e4;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const GenerateIcon = styled.div`
  height: 5rem;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #373c4b;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  pointer-events: move;

  .text {
    font-size: 1.4rem;
  }
  &:hover {
    background-color: #19343a;
  }
`;
