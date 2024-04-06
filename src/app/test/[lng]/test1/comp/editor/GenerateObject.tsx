import styled from "styled-components";
import { IoCubeOutline } from "react-icons/io5";
import { TbCone } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { TbCylinder } from "react-icons/tb";
import { TbCapsule } from "react-icons/tb";
import { GiDonut } from "react-icons/gi";

const GenerateObject = ({ generate3DObject }: any) => {
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
      {/* {state.target !== null && <Toolbar_v2 />} */}
      {icons.map((object, index) => {
        return (
          <GenerateIcon
            key={index}
            onClick={() => {
              generate3DObject(object.type);
            }}
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

const Container = styled.canvas`
  display: flex;
  color: #e4e4e4;
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
  .text {
    font-size: 1.4rem;
  }
  &:hover {
    background-color: #19343a;
  }
`;
