import styled from "styled-components";
import useObjectStore_v6 from "./useObjectStore_v6";
import { useEffect, useState } from "react";

const ObjectList = ({ threeSceneRef, boxRef }: any) => {
  const { objects, mode, target, addObject, selectObject, setMode } =
    useObjectStore_v6();

  const [clicked, setClicked] = useState(-1);

  return (
    <>
      {threeSceneRef.current ? (
        <Container>
          {threeSceneRef.current.children.map((item: any, index: any) => {
            return (
              <Items
                $background={clicked == index ? "#373C4B" : "#000000"}
                key={index}
                onClick={() => {
                  setClicked(index);

                  console.log(threeSceneRef.current);

                  // const groupObject = item.children.find(
                  //   (obj: any) => obj.type === "Group"
                  // );
                  // // console.log("Mesh", groupObject);
                  // const Mesh = groupObject.children.find(
                  //   (obj: any) => obj.type === "Mesh"
                  // );
                  // // //  boxRef.current = Mesh
                  // // const findTest = Mesh.find(
                  // //   (obj: any) => obj.uuid === target?.uuid
                  // // );
                  // //  console.log(findTest);      console.log(groupObject);
                  // console.log(Mesh, "Mesh");
                  // console.log(groupObject[4], "????");
                  // console.log(threeSceneRef.current.children[4], "????");
                  // console.log(target, "target");
                }}
              >
                {item.type}
              </Items>
            );
          })}
        </Container>
      ) : null}
    </>
  );
};

export default ObjectList;

const Container = styled.div`
  width: 100px;
  height: 40rem;
  position: absolute;
  top: 10rem;
  left: 10rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;
`;

const Items = styled.div<any>`
  background-color: ${(props) => props.$background};
  width: 100%;
  padding: 0.5rem;

  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
`;
