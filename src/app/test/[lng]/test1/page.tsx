//수정 할 것 많이 있어서 대표님 보시면 안되는 코드

'use client';

import { useState } from 'react';
import ThreeContainer from './comp/ThreeContainer';
import ThreeWindow_v3 from './comp/ThreeWindow_v3';
import ThreeWindow_v4 from './comp/ThreeWindow_v4';
import { SiThreedotjs } from 'react-icons/si';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

export default function Page() {
  const [threeDisplay, setThreeDisplay] = useState(false);
  const [startTime, setStartTime] = useState<any>();
  const [time, setTime] = useState<any>(false);
  const [size, setSize] = useState({ width: '640px', height: '480px' });
  const [position, setPosition] = useState({ x: 200, y: 0 });

  const handleClose = () => {
    console.log('close');
    setThreeDisplay(false);
  };
  const handleMouseDown = () => {
    const startTime_ = Date.now();
    const startDate = new Date(startTime_);
    setStartTime(startDate);
    setTimeout(() => {
      setTime(true); // 0.5초 후에 time 상태 업데이트
    }, 500);
    return setTime(false);
  };
  const handleMouseUp = () => {
    if (time == true) {
      console.log('이건 드래그예용');
    } else {
      console.log('이건 클릭');
      setThreeDisplay(true);
    }
  };

  return (
    <>
      {threeDisplay ? (
        <ThreeWindow_v4 handleClose={handleClose} />
      ) : (
        <Rnd
          className="minbtn"
          default={{
            x: position.x,
            y: position.y,
            width: 44,
            height: 44
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
          }}>
          <MinimizeButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div>
              <SiThreedotjs></SiThreedotjs>
            </div>
          </MinimizeButton>
        </Rnd>
      )}
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
