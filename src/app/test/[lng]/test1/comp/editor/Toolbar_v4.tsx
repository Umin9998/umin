import styled from "styled-components";
import useObjectStore_v6 from "../../store/useObjectStore_v6";
import { useEffect, useState } from "react";
import * as THREE from "three";
const Toolbar_v4 = ({
  position,
  rotation,
  scale,
  handlePositionChange,
  handleScaleChange,
  handleRotationChange,
}: any) => {
  const { target, updateObject } = useObjectStore_v6();

  const [testPositionx, setTestPositionx] = useState<number>();
  const [testPositiony, setTestPositiony] = useState<number>();
  const [testPositionz, setTestPositionz] = useState<number>();
  const [testRotationx, setTestRotationx] = useState<number>();
  const [testRotationy, setTestRotationy] = useState<number>();
  const [testRotationz, setTestRotationz] = useState<number>();
  const [testScalex, setTestScalex] = useState<number>();
  const [testScaley, setTestScaley] = useState<number>();
  const [testScalez, setTestScalez] = useState<number>();
  useEffect(() => {
    if (
      target != null &&
      target.position != undefined &&
      target.rotation != undefined &&
      target.scale != undefined
    ) {
      setTestPositionx(target.position.x);
      setTestPositiony(target.position.y);
      setTestPositionz(target.position.z);
      setTestRotationx(target.rotation.x);
      setTestRotationy(target.rotation.y);
      setTestRotationz(target.rotation.z);
      setTestScalex(target.scale.x);
      setTestScaley(target.scale.y);
      setTestScalez(target.scale.z);
    }
  }, [
    target,
    target?.position?.x,
    target?.position?.y,
    target?.position?.z,
    target?.rotation?.x,
    target?.rotation?.y,
    target?.rotation?.z,
    target?.scale?.x,
    target?.scale?.y,
    target?.scale?.z,
  ]);

  const handlePosition = (e: any, type: string) => {
    if (target !== null && target.position !== undefined) {
      let newObject = {};
      switch (type) {
        case "x":
          newObject = {
            ...target,
            position: new THREE.Vector3(
              parseFloat(e.target.value),
              target.position.y,
              target.position.z
            ),
          };
          setTestPositionx(parseFloat(e.target.value));
          break;
        case "y":
          newObject = {
            ...target,
            position: new THREE.Vector3(
              target.position.x,
              parseFloat(e.target.value),
              target.position.z
            ),
          };
          setTestPositiony(parseFloat(e.target.value));
          break;
        case "z":
          newObject = {
            ...target,
            position: new THREE.Vector3(
              target.position.x,
              target.position.y,
              parseFloat(e.target.value)
            ),
          };
          setTestPositionz(parseFloat(e.target.value));
          break;
      }

      updateObject(newObject);
    }
  };

  const positionInputData = [
    {
      value: testPositionx,
      type: "x",
    },
    {
      value: testPositiony,
      type: "y",
    },
    {
      value: testPositionz,
      type: "z",
    },
  ];
  const handleRotation = (e: any, type: string) => {
    if (target !== null && target.rotation !== undefined) {
      setTestRotationx(parseFloat(e.target.value));
      let newObject = {};
      switch (type) {
        case "x":
          newObject = {
            ...target,
            rotation: new THREE.Euler(
              parseFloat(e.target.value),
              target.rotation.y,
              target.rotation.z
            ),
          };
          setTestRotationx(parseFloat(e.target.value));
          break;
        case "y":
          newObject = {
            ...target,
            rotation: new THREE.Euler(
              target.rotation.x,
              parseFloat(e.target.value),
              target.rotation.z
            ),
          };
          setTestRotationy(parseFloat(e.target.value));
          break;
        case "z":
          newObject = {
            ...target,
            rotation: new THREE.Euler(
              target.rotation.x,
              target.rotation.y,
              parseFloat(e.target.value)
            ),
          };
          setTestRotationz(parseFloat(e.target.value));
          break;
      }

      updateObject(newObject);
    }
  };
  const rotationInputData = [
    {
      value: testRotationx,
      type: "x",
    },
    {
      value: testRotationy,
      type: "y",
    },
    {
      value: testRotationz,
      type: "z",
    },
  ];

  const handleScale = (e: any, type: string) => {
    if (target !== null && target.scale !== undefined) {
      let newObject = {};
      switch (type) {
        case "x":
          newObject = {
            ...target,
            scale: new THREE.Vector3(
              parseFloat(e.target.value),
              target.scale.y,
              target.scale.z
            ),
          };
          setTestScalex(parseFloat(e.target.value));
          break;
        case "y":
          newObject = {
            ...target,
            scale: new THREE.Vector3(
              target.scale.x,
              parseFloat(e.target.value),
              target.scale.z
            ),
          };
          setTestScaley(parseFloat(e.target.value));
          break;
        case "z":
          newObject = {
            ...target,
            scale: new THREE.Vector3(
              target.scale.x,
              target.scale.y,
              parseFloat(e.target.value)
            ),
          };
          setTestScalez(parseFloat(e.target.value));
          break;
      }

      updateObject(newObject);
    }
  };
  const scaleInputData = [
    {
      value: testScalex,
      type: "x",
    },
    {
      value: testScaley,
      type: "y",
    },
    {
      value: testScalez,
      type: "z",
    },
  ];
  return (
    <>
      {target != null && target.position != undefined && (
        <Container>
          <div className="positions">
            {positionInputData.map((item: any, index: any) => {
              return (
                <label key={index}>
                  {item.type} :
                  <input
                    type="number"
                    name="x"
                    value={item.value}
                    onChange={(e: any) => {
                      console.log(target);
                      handlePosition(e, item.type);
                    }}
                  />
                </label>
              );
            })}
          </div>
          <div className="rotations">
            {rotationInputData.map((item: any, index: any) => {
              return (
                <label key={index}>
                  {item.type} :
                  <input
                    type="number"
                    name="x"
                    value={item.value}
                    onChange={(e: any) => {
                      console.log(target);
                      handleRotation(e, item.type);
                    }}
                  />
                </label>
              );
            })}
          </div>
          <div className="scales">
            {scaleInputData.map((item: any, index: any) => {
              return (
                <label key={index}>
                  {item.type} :
                  <input
                    type="number"
                    name="x"
                    value={item.value}
                    onChange={(e: any) => {
                      console.log(target);
                      handleScale(e, item.type);
                    }}
                  />
                </label>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
};

export default Toolbar_v4;

const Container = styled.div`
  background-color: #373c4b;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 20rem;
  label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #fff;
    input {
      color: #373c4b;
    }
  }
`;
