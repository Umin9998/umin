"use client";

import React, { use, useEffect, useRef, useState } from "react";

import styled from "styled-components";
import BlocklyCoding from "./BlocklyCoding";
import * as Blockly from "blockly";

const BlocklyCodingBox = () => {
  const [chatDisplay, setChatDisplay] = useState(false);
  const [size, setSize] = useState({ width: "320px", height: "480px" });
  const [room, setRoom] = useState<any>("");
  const [windowinnerHeight, setWindowinnerHeight] = useState<
    number | undefined
  >(undefined);
  const [position, setPosition] = useState({
    x: 60,
    y: windowinnerHeight ? windowinnerHeight - 100 : 0,
  });
  const [test, setTest] = useState<any>([]);
  const parentRef = useRef<any>();
  const childRef = useRef<any>();
  const handleRef = useRef<any>();

  const blocklyDivRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg>();

  // useEffect(() => {
  //   const room = serachinfo.get('room');
  //   setRoom(room);
  //   const handleResize = () => {
  //     setWindowinnerHeight(window.innerHeight);
  //   };
  //   handleResize();
  //   fetch(`http://localhost:3000/base/polyade/view/page/test_umin/api/${room}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json' // Set the request headers to indicate JSON format
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setTest(data));
  //   // window.addEventListener('resize', handleResize);

  //   // return () => {
  //   //   window.removeEventListener('resize', handleResize);
  //   // };
  // }, []);
  console.log(test, "test");
  useEffect(() => {
    // windowinnerHeight 값이 설정되면 position 상태를 업데이트합니다.
    if (windowinnerHeight !== undefined) {
      setPosition({ x: 10, y: windowinnerHeight - 100 });
    }
  }, [windowinnerHeight]);

  useEffect(() => {
    if (parseInt(size.width.replaceAll("px", "")) < 200) {
      setSize({ width: "250px", height: size.height });
    }
    if (parseInt(size.height.replaceAll("px", "")) < 200) {
      setSize({ width: size.width, height: "250px" });
    }
    console.log(size, "size");
  }, [size]);

  useEffect(() => {
    console.log("position", position);
    if (position.y <= 0) {
      setPosition({ x: position.x, y: 10 });
    }
    if (position.x <= 0) {
      setPosition({ x: 10, y: position.y });
    }
    if (
      position.x + parseInt(size.width.replaceAll("px", "")) + 20 >
      window.innerWidth
    ) {
      setPosition({
        x: window.innerWidth - parseInt(size.width.replaceAll("px", "")) - 50,
        y: position.y,
      });
    }
    if (
      position.y + parseInt(size.height.replaceAll("px", "")) + 20 >
      window.innerHeight
    ) {
      setPosition({
        x: position.x,
        y: window.innerHeight - parseInt(size.height.replaceAll("px", "")) - 50,
      });
    }
  }, [position]);
  // Additionally, you might want to add an event listener to handle window resizing, so the canvas remains responsive:
  // With these changes, your canvas will initially render with zero dimensions and then adjust to the correct size once the component has mounted in the browser.
  // const updateSize = () => {
  //   setWindowinnerHeight(window.innerHeight);
  // };

  // window.addEventListener('resize', updateSize);
  // updateSize();

  // return () => window.removeEventListener('resize', updateSize);
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
  const handleChatClose = () => {
    setChatDisplay(false);
  };
  const handleChatOpen = () => {
    setChatDisplay(true);
  };
  const handleMin = () => {
    setChatDisplay(false);
    setPosition({ x: 10, y: windowinnerHeight ? windowinnerHeight - 200 : 0 });
  };
  console.log(blocklyDivRef.current?.clientWidth, "blocklyDivRef");
  console.log(blocklyDivRef.current?.clientHeight, "blocklyDivRef");
  return (
    <>
      {" "}
      <BlocklyCoding
        blocklyDivRef={blocklyDivRef}
        workspaceRef={workspaceRef}
        size={size}
      />
    </>
  );
};

export default BlocklyCodingBox;
const MinimizeButton = styled.div`
  width: 100%;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  > div {
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid transparent;
    width: 10rem;
    height: 10rem;
    font-size: 2rem;
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
  }
`;
const ChatContainer = styled.div<any>`
  // display: ${(props: any) => (props.$display ? "block" : "none")};
  position: relative;
  height: ${(props: any) => (props.$display ? "100%" : "4.4rem")};
  border-radius: 10px;
  overflow: hidden;
`;
const Handle = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  cursor: move;
  background: rgba(0, 0, 0, 0.25);
  height: 4.4rem;
  z-index: 1;
  .roomTitle {
    color: #fff;
    padding-left: 1rem;
    font-size: 1.5rem;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const BtnContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0 10px 0 0;
  font-size: 2rem;
  color: #fff;
  height: 4.4rem;
  width: 4.4rem;
`;
