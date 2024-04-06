"use client";

import styled from "styled-components";
import TestComp from "./comp/TestComp";

export default function Page() {
  return (
    <>
      <TestComp />
    </>
  );
}
const MinimizeButton = styled.div<any>`
  display: flex;
  align-items: center;

  position: absolute;
  z-index: 10;

  cursor: pointer;
  width: 40px;
  height: 40px;
  cursor: move;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    &:hover {
      background: rgba(255, 255, 255, 0.8);
    }
  }
`;
