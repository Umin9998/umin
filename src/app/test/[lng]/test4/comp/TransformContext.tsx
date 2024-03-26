import styled from "styled-components";
import useObjectStore from "../store/ObjectStore";

const TransformContext = ({ x, y, setMenuPos }: any) => {
  const { state, actions } = useObjectStore();
  return (
    <>
      <ul>
        <li
          onClick={() => {
            actions.setMode("translate");
            setMenuPos(null);
          }}
        >
          translate
        </li>
        <li
          onClick={() => {
            actions.setMode("rotate");
            setMenuPos(null);
          }}
        >
          rotate
        </li>
        <li
          onClick={() => {
            actions.setMode("scale");
            setMenuPos(null);
          }}
        >
          scale
        </li>
      </ul>
    </>
  );
};

export default TransformContext;
const ContextMenu = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  //background-color: #f0f0f0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-family: sans-serif;
  font-size: 14px;
  z-index: 1000;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & li {
    padding: 8px 10px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
      border-radius: 5px;
    }
  }
`;
