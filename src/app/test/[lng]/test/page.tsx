"use client";

import React, { use, useEffect, useRef, useState } from "react";

import styled from "styled-components";

// https://github.com/bokuweb/react-rnd
// https://bokuweb.github.io/react-rnd/stories
import { Rnd } from "react-rnd";

import * as Blockly from "blockly";

import BlocklyTest from "./comp/BlocklyTest";

import { add } from "algebra-lib";

const CustomResizeHandle = () => {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        opacity: 0,
        background: "#000000",
        position: "absolute",
        borderRadius: "0 0 10px 0",
        right: 10,
        bottom: -20,
        cursor: "nwse-resize", // Diagonal resize cursor
      }}
    >
      {/* You can add an icon or any other custom content here */}
    </div>
  );
};

const CloseHandle = () => {
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        opacity: 0,
        background: "#000000",
        position: "absolute",
        borderRadius: "0 0 10px 0",
        right: 10,
        bottom: -20,
        cursor: "close",
      }}
    ></div>
  );
};

const Page = () => {
  const [size, setSize] = React.useState({ width: "640px", height: "480px" });
  const [position, setPosition] = React.useState({ x: 300, y: 300 });
  const [test, setTest] = useState<any>([]);
  const [result, setResult] = useState<any>([]);
  const parentRef = useRef<any>();
  const childRef = useRef<any>();
  const handleRef = useRef<any>();

  const blocklyDivRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg>();

  console.log(add(1, 2));

  // useEffect(() => {
  //   if (parentRef.current && childRef.current) {
  //     //const parentWidth = parentRef.current.clientWidth;
  //     const parentWidth = parentRef.current.props.size.width;
  //     const parentHeight = parentRef.current.props.size.height;
  //     childRef.current.style.width = `${parentWidth}px`;
  //     childRef.current.style.height = `${parentHeight}px`;
  //     console.log('parentWidth', parentWidth);
  //     console.log('parentHeight', parentHeight);
  //   }
  // }, [parentRef.current]); // X

  // useEffect(() => {
  //   if (workspaceRef.current && blocklyDivRef.current) {
  //     blocklyDivRef.current.style.width = parentRef.current.props.size.width;
  //     blocklyDivRef.current.style.height = parentRef.current.props.size.height;

  //     console.log('parentRef.current.props.position', parentRef.current.props.position);
  //     console.log('parentRef.current.props.size', parentRef.current.props.size);

  //     Blockly.svgResize(workspaceRef.current);
  //   }
  // }, []);
  const testClick = async () => {
    const userInput = test;
    const response = await fetch("/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: userInput }),
    });
    const data = await response.json();
    setResult(data);
  };
  return (
    <Rnd
      ref={parentRef}
      dragHandleClassName="my-drag-handle" // Users will be able to drag the react-rnd component only when they click and drag from this specified area.
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      resizeHandleComponent={{
        bottomRight: <CustomResizeHandle />, // Use custom component for the bottom-right handle
      }}
      enableResizing={{
        top: false, // Prevent resizing from the top
        right: true,
        bottom: true,
        left: true,
        topRight: false,
        bottomRight: true,
        bottomLeft: true,
        topLeft: false, // Optionally, prevent resizing from the top-left corner as well
      }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });

        // if (workspaceRef.current && blocklyDivRef.current && parentRef.current) {
        //   blocklyDivRef.current.style.width = parentRef.current.props.size.width;
        //   blocklyDivRef.current.style.height = parentRef.current.props.size.height;

        //   console.log('parentRef.current.props.position', parentRef.current.props.position);
        //   console.log('parentRef.current.props.size', parentRef.current.props.size);

        //   Blockly.svgResize(workspaceRef.current);
        // }
      }}
      onResize={(e, direction, ref, delta, position) => {
        if (workspaceRef.current && blocklyDivRef.current) {
          //console.log('resize');

          // [Resize]
          // https://developers.google.com/blockly/guides/configure/web/resizable
          // https://google.github.io/blockly-samples/examples/resizable-demo/overlay.html
          // https://github.com/google/blockly-samples/blob/master/examples/resizable-demo/overlay.html
          blocklyDivRef.current.style.width = ref.style.width;
          blocklyDivRef.current.style.height =
            parseInt(ref.style.height, 10) -
            parseInt(handleRef.current.style.height, 10) +
            "px";

          handleRef.current.style.width = ref.style.width;
          handleRef.current.style.height = "40px";

          //console.log(parseInt(handleRef.current.style.height, 10));

          // console.log('parentRef.current.props.position', parentRef.current.props.position);
          // console.log('parentRef.current.props.size', parentRef.current.props.size);

          Blockly.svgResize(workspaceRef.current);
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });

        if (workspaceRef.current && blocklyDivRef.current) {
          blocklyDivRef.current.style.width = ref.style.width;
          blocklyDivRef.current.style.height =
            parseInt(ref.style.height, 10) -
            parseInt(handleRef.current.style.height, 10) +
            "px";

          handleRef.current.style.width = ref.style.width;
          handleRef.current.style.height = "40px";

          Blockly.svgResize(workspaceRef.current);
        }
      }}
    >
      {/* <BlocklyTestWrapper ref={childRef}> */}
      {/* Drag Handle Area */}
      <Handle ref={handleRef} className="my-drag-handle top">
        <div>Drag from here</div>
      </Handle>
      {/* Non-draggable Content Area */}
      <BlocklyTest
        setTest={setTest}
        blocklyDivRef={blocklyDivRef}
        workspaceRef={workspaceRef}
      />
      {/* </BlocklyTestWrapper> */}
      <Handle ref={handleRef} className="my-drag-handle bottom">
        <div>Drag from here</div>
      </Handle>
      <button
        onClick={() => {
          testClick();
        }}
      >
        clickclick
      </button>
      <div id="result">{result}</div>
    </Rnd>
  );
};

export default Page;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 1rem;
  cursor: move;
  background: #aaa;
  //border: 1px solid #000;
  //border-radius: 10px 10px 0 0;

  &.top {
    border-radius: 10px 10px 0 0;
  }

  &.bottom {
    border-radius: 0 0 10px 10px;
  }
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #aaa;
  width: 40px;
  height: 40px;
  transform: translateX(10px);
  border-radius: 0 10px 0 0;
`;

// const BlocklyTestWrapper = styled.div`
//   background-color: #0000ff;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
//   margin: 1rem;
//   padding: 1rem;
// `;
