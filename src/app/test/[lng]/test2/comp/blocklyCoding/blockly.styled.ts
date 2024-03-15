import { styled } from 'styled-components';
export const statusColor = ' rgba(255, 255, 255, 0.1)';
export const btnColor = ' rgba(255, 255, 255, 0.15)';

export const Container = styled.div<any>`
  background: rgba(29, 35, 42, 0.9);
  border: 1px solid #f00;
  color: #fff;
  height: ${(props: any) => props.size};
  padding-top: 4.4rem;
  position: relative;

  // .blockBox {
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-start;
  //   justify-content: flex-end;
  //   border: 1px solid transparent;
  //   height: calc(100% - 4.4rem);
  //   overflow-y: hidden;
  //   overflow-x: hidden;
  // }
`;

export const Form = styled.form`
  background: ${statusColor};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 4.4rem;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const Input = styled.input`
  border: none;
  height: 4.4rem;
  padding: 1.6rem 1rem;
  width: calc(100% - 4.4rem);
  color: #fff;
  font-size: 1.4rem;

  background: transparent;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  background: ${btnColor};
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  height: 4.4rem;
  width: 4.4rem;
`;

export const Messages = styled.ul<any>`
  list-style-type: none;
  display: flex;
  flex-direction: column-reverse;

  gap: 1rem;
  color: #fff;
  font-size: 1.4rem;
  padding: 0.8rem;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤 바의 너비 */
    height: 8px; /* 스크롤 바의 높이 */
    background-color: transparent; /* 스크롤 바의 배경색 */
    border-radius: 4px; /* 스크롤 바의 모서리 둥글게 */
  }

  /* 스크롤 바의 색상 지정 */
  &::-webkit-scrollbar-thumb {
    border-radius: 4px; /* 스크롤 바의 모서리 둥글게 */
    background-color: #d9d9d9; /* 스크롤 바의 색상 */
  }

  /* 스크롤 바 호버 시 색상 지정 */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #ff8800; /* 스크롤 바의 색상 */
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
  .userName {
    font-size: 1.2rem;
  }
  .ChatRow {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 0.5rem;
    .textBox,
    .imageBox {
      display: flex;
      flex-direction: row;

      gap: 0.5rem;
      padding: 0.4rem 0.8rem;
      background: ${btnColor};
      border-radius: 4px;
    }
    .time {
      font-size: 1rem;
    }
  }
`;

export const MessageItem = styled.li`
  padding: 0.5rem 1rem;
  color: #fff;
  &:nth-child(odd) {
    background: #efefef;
  }
`;
