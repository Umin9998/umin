import { styled } from "styled-components";

const ListThirdSwitchBtn = ({
  nowActivatedTabValueHandler,
  nowActivatedTabValue,
}: any) => {
  const SwitchBtn = styled.div`
    display: flex;
    justify-content: center;
  `;
  const ThirdSwitchBtn = styled.button`
    width: 161px;
    height: 41px;
    font-size: 14px;
    font-weight: 700;
    transition: all 400ms;
    &.btnL {
      background-color: #4713da;
      color: #fff;
      &:hover {
        background-color: #4713da;
        box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
      }
    }
    &.btnR {
      border: 1px solid #b3bbc8;
      background-color: #fff;
      color: rgba(0, 10, 94, 0.5);
      &:hover {
        background-color: #fff;
        box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
      }
    }
  `;
  return (
    <SwitchBtn>
      <ThirdSwitchBtn
        className={nowActivatedTabValue === "application" ? "btnL" : "btnR"}
        value="application"
        onClick={(e) => {
          nowActivatedTabValueHandler((e.target as HTMLButtonElement).value);
        }}
      >
        상담신청
      </ThirdSwitchBtn>
      <ThirdSwitchBtn
        className={nowActivatedTabValue === "reservation" ? "btnL" : "btnR"}
        value="reservation"
        onClick={(e) => {
          nowActivatedTabValueHandler((e.target as HTMLButtonElement).value);
        }}
      >
        예약확정
      </ThirdSwitchBtn>
      <ThirdSwitchBtn
        className={nowActivatedTabValue === "completion" ? "btnL" : "btnR"}
        value="completion"
        onClick={(e) => {
          nowActivatedTabValueHandler((e.target as HTMLButtonElement).value);
        }}
      >
        상담완료
      </ThirdSwitchBtn>
    </SwitchBtn>
  );
};

export default ListThirdSwitchBtn;
