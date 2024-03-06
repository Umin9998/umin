import { styled } from "styled-components";

export const Container = styled.div`
  background: #000;
  color: #fff;
  height: 100vh;
`;

export const Form = styled.form`
  background: rgba(255, 255, 255, 0.5);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 5rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
`;

export const Input = styled.input`
  border: none;
  padding: 0 1rem;
  width: 100%;
  border-radius: 2rem;
  margin: 0.25rem;
  color: #000;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  background: hotpink;
  border: none;
  padding: 1rem;

  border-radius: 5px;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
`;

export const Messages = styled.ul`
  list-style-type: none;
  margin: 0;
  height: calc(100vh - 10rem);
  padding: 1rem;
  color: #fff;
  overflow-y: scroll;
  font-size: 1.5rem;
  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-thumb {
    width: 248px;
    height: 9px;
    border-radius: 100px;
    background: #d9d9d9;
  }
  &::-webkit-scrollbar-track {
    background: transperant;
  }

  > li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    .content {
      gap: 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }

  .textBox,
  .imageBox {
    border: 1px solid #f0f;
    background: hotpink;
    padding: 0.5rem 1rem;
    width: fit-content;
    border-radius: 1rem;
  }
`;

export const MessageItem = styled.li`
  padding: 0.5rem 1rem;
  color: #fff;
  &:nth-child(odd) {
    background: #efefef;
  }
`;
