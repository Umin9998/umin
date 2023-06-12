import { styled } from "styled-components";

const ListSwitchBtn = ({
  nowActivatedTabValueHandler,
  nowActivatedTabValue,
}: any) => {
  const SwitchBtn = styled.div`
    margin: 50px 0;
    display: flex;
    justify-content: center;
  `;

  const Btn = styled.button`
    width: 161px;
    height: 41px;
    font-size: 14px;
    font-weight: 700;
    transition: all 400ms;
    border-radius: 4px;
    &.btnL {
      background-color: #4713da;
      color: #fff;
    }
    &.btnR {
      border: 1px solid #b3bbc8;
      background-color: #fff;
      color: rgba(0, 10, 94, 0.5);
    }
  `;

  return (
    <SwitchBtn>
      <Btn
        value="application"
        className={nowActivatedTabValue === "application" ? "btnL" : "btnR"}
        onClick={(e) => {
          // https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
          nowActivatedTabValueHandler((e.target as HTMLButtonElement).value);
          console.log(nowActivatedTabValue);
        }}
      >
        {" "}
        상담신청
      </Btn>
      <Btn
        value="completion"
        className={nowActivatedTabValue === "completion" ? "btnL" : "btnR"}
        onClick={(e) => {
          // https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
          nowActivatedTabValueHandler((e.target as HTMLButtonElement).value);
          console.log(nowActivatedTabValue);
        }}
      >
        상담완료
      </Btn>
    </SwitchBtn>
  );
};

export default ListSwitchBtn;
