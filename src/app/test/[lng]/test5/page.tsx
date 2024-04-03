"use client";

import useKeyboard from "../test3/customs/useKeyboard";
import "./styles.css";

import Canvas1 from "./comp/Canvas1";

const Page = () => {
  const keyMap = useKeyboard();

  return (
    <>
      <Canvas1></Canvas1>
    </>
  );
};

export default Page;
