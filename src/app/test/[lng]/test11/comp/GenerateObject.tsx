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
  setSelectedObjectType,
  createObject,
  threeSceneRef,
}: any) => {
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

  return (
    <Container>
      {icons.map((object, index) => {
        return (
          <GenerateIcon
            key={index}
            draggable
            onClick={() => {
              setSelectedObjectType(object.type);
              createObject(object.type);
              console.log(threeSceneRef.current, "threeSceneRef.current");
            }}
            onDragStart={() => {
              setSelectedObjectType(object.type);
              console.log("dragstart");
            }}
          >
            <div className="icon">{object.icon}</div>
            <div className="text">{object.type}</div>
          </GenerateIcon>
        );
      })}
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
