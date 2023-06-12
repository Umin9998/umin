import React, { useEffect, useState } from "react";
import Image from "next/image";
import calendar from "../image/calendar.svg";

import dayjs from "dayjs";
import styled from "styled-components";

import search from "../image/Search.png";

const ListSearchBar = ({
  nowSearchDateValueHandler, //Search Date
  fetchApplicationList, //신청서목록 데이터를 요청하는데 currentPageNumber 인자로 넘겨줌
  nowActivatedTabValue, //activated tap value
  handleNowSearchTypeValue, //검색타입 상태값 변경 함수
  nowSearchTypeValue, //검색타입 상태값 //화면에 보이는 값

  handleNowSearchWordValue, //검색어 상태값 변경 함수
  nowSearchWordValue, //검색어 상태값 //화면에 보이는 값
  setNowSearchWordValue,
  handleStateValueConversion, //사용자가 한글로 검색어를 입력했을 때, API에 보내는 검색타입 상태값을 변경해주는 함수
}: any) => {
  const startDate = new Date(); //오늘 날짜
  const endDate = new Date(); //오늘 날짜
  startDate.setDate(startDate.getDate()); //오늘 날짜에서 365일 빼기
  endDate.setDate(endDate.getDate() + 180);
  //달력 한국어

  const [startSelectDate, setStartSelectDate] = useState(new Date(startDate)); //달력 처음 선택 날짜안에 오늘 날짜 넣기
  const [endSelectDate, setEndSelectDate] = useState(new Date(endDate)); //달력 마지막 선택 날짜안에 오늘 날짜 넣기
  const [calendarSelectDate, setCalendarSelectDate] = useState({});

  const handleStartSelectDateChange = (dateFormat: any) => {
    console.log(dateFormat);
    setStartSelectDate(dateFormat);
    setCalendarSelectDate({
      ...calendarSelectDate,
      _startDate: dayjs(dateFormat).format("YYYY-MM-DD"),
    });
  };

  const handleEndSelectDateChange = (dateFormat: any) => {
    console.log(dateFormat);
    setEndSelectDate(dateFormat);
    setCalendarSelectDate({
      ...calendarSelectDate,
      _endDate: dayjs(dateFormat).format("YYYY-MM-DD"),
    });
  };

  useEffect(() => {
    //useEffect로 달력 날짜 변경시 바로 조회되게 하기
    nowSearchDateValueHandler(
      //부모 컴포넌트로 날짜 전달
      dayjs(startSelectDate).format("YYYY-MM-DD"), //시작 날짜
      dayjs(endSelectDate).format("YYYY-MM-DD") // 끝 날짜
    );
  }, [startSelectDate, endSelectDate]); //날짜 변경시 바로 조회되게 하기 //검색어 변경시 바로 조회되게 하기

  const onSearchClick = () => {
    nowSearchDateValueHandler(
      dayjs(startSelectDate).format("YYYY-MM-DD"), //시작 날짜
      dayjs(endSelectDate).format("YYYY-MM-DD") //끝 날짜
    );
    fetchApplicationList(1); //api 호출 후 1페이지로 이동
  };

  const onSearchByWord = () => {
    nowSearchDateValueHandler(
      dayjs(startSelectDate).format("YYYY-MM-DD"), //시작 날짜
      dayjs(endSelectDate).format("YYYY-MM-DD") //끝 날짜
    );
    if (nowSearchWordValue === "") {
      alert("검색어를 입력해 주세요.");
    } else {
      fetchApplicationList(1); //api 호출 후 1페이지로 이동
    }
  }; //search img onclick event

  const getSearchPeriodText = () => {
    switch (nowActivatedTabValue) {
      case "application":
        return "※ 상담희망일시 기간을 조회합니다.";
      case "reservation":
        return "※ 예약확정일시 기간을 조회합니다.";
      case "completion":
        return "※ 상담완료일시 기간을 조회합니다.";
      default:
        return "";
    }
  };

  const SearchText = styled.p`
    position: absolute;
    bottom: -20px;
    color: #9b9b9b;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  `;
  const SearchBar = styled.div`
    align-items: center;
    width: 100%;
    min-width: 540px;
  `;

  const SearchBarDeskTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    margin: 0 auto;
    text-align: center;
    padding: 20px 40px;
    box-sizing: border-box;
    background-color: #f9f9ff;
    div {
      display: flex;
      position: relative;
    }
    span {
      margin-right: 10px;
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 91px;
      height: 48px;
      border-radius: 4px;
      background-color: #4713da;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      &:hover {
        background-color: #4e28ba;
      }
    }
  `;

  const Dateinput = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    padding: 15px;
    margin-right: 14px;
    border: 1px solid #e9e9e9;
    border-radius: 12px;
    background-color: #fff;
    font-size: 16px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
    cursor: pointer;

    &:hover {
      background-color: #fff;
      border-color: rgba(223, 225, 229, 0);
      box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    }
  `;
  const DatePicker = styled.div`
    width: 90px;
    position: relative;
    cursor: pointer;
    input {
      width: 100%;
    }
  `;

  const SelectPicker = styled.div`
    display: flex;
    
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      align-item:center;
      select {
        width: 270px;
        height: 54px;
        padding: 15px 20px;
        border: 1px solid #e9e9e9;
        border-radius: 12px;
        background: #ffffff;
        font-size: 14px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        cursor: pointer;
    
        &:hover {
          background-color: #fff;
          border-color: rgba(223, 225, 229, 0);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      }

}
 

  `;

  const Selection = styled.select`

    width: 114px;
    height: 53px;
    padding: 0 10px;
    margin-right: 10px;
    font-size: 16px;
    background-color: #ffffff;
    border: 1px solid #e9e9e9;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
   
    }
  `;

  const Search = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    input {
      width: 100%;
      height: 53px;
      padding: 15px 20px;
      border: 1px solid #e9e9e9;
      border-radius: 12px;
      background: #ffffff;
      font-size: 14px;
      box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
      box-sizing: border-box;
    }
  `;
  return (
    <SearchBar>
      <SearchBarDeskTop>
        <div>
          {" "}
          <Dateinput>
            {" "}
            <DatePicker>
              <input
                type="text"
                value="YYYY.MM.DD"
                onChange={handleStartSelectDateChange}
              />
            </DatePicker>
            <Image src={calendar} width={20} height={20} alt="calendar"></Image>
          </Dateinput>
          <span>-</span>
          <Dateinput>
            <DatePicker>
              <input
                type="text"
                value="YYYY.MM.DD"
                onChange={handleEndSelectDateChange}
              />
            </DatePicker>

            <Image src={calendar} width={20} height={20} alt="calendar"></Image>
          </Dateinput>
          <button onClick={onSearchClick}>조회</button>
          <SearchText>{getSearchPeriodText()}</SearchText>
        </div>
        <SelectPicker>
          <Selection>
            {nowActivatedTabValue === "completion" ? (
              <>
                <option value="title">제목</option>
                <option value="counseling_type">상담유형</option>
                <option value="teacherName">상담교사</option>
              </>
            ) : (
              <>
                <option value="title">제목</option>
                <option value="counseling_type">상담유형</option>
                <option value="teacherName">상담교사</option>
                <option value="state">상태</option>
              </>
            )}
          </Selection>
          <div>
            {nowSearchTypeValue === "counseling_type" ? (
              <select>
                {SEARCHBAR_COUNSELING_TYPE.map(({ id, label, value }) => (
                  <option key={id} value={label}>
                    {label || (id === 1 ? value : null)}
                  </option>
                ))}
              </select>
            ) : nowSearchTypeValue === "state" &&
              location.pathname === "/advice/list" ? (
              <select
                onChange={handleStateValueConversion}
                value={nowSearchWordValue}
              >
                {SEARCHBAR_STATE.map(({ id, label, value }) => (
                  <option key={id} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            ) : nowSearchTypeValue === "state" &&
              location.pathname === "/advice/teacherList" ? (
              <select
                onChange={handleStateValueConversion}
                value={nowSearchWordValue}
              >
                {SEARCHBAR_STATE_TEACHER_APPLICATION.map(
                  ({ id, label, value }) => (
                    <option key={id} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            ) : (
              <Search>
                {" "}
                <input
                  placeholder="검색어를 입력해 주세요."
                  onChange={handleNowSearchWordValue}
                />
              </Search>
            )}
            <Image
              src={search}
              width={30}
              height={30}
              alt="search"
              onClick={onSearchByWord}
            ></Image>
          </div>
        </SelectPicker>
      </SearchBarDeskTop>

      {/* 모바일 추가  */}
    </SearchBar>
  );
};

export default ListSearchBar;

const SEARCHBAR_COUNSELING_TYPE = [
  { id: 1, label: "진로", value: "career" },
  { id: 2, label: "학업", value: "study" },
  { id: 3, label: "진학", value: "promotion" },
  { label: "기타", value: "etc" },
];

const SEARCHBAR_STATE = [
  { id: 1, label: "예약대기", value: "re" },
  { id: 2, label: "확인중", value: "ch" },
  { id: 3, label: "예약확정", value: "con" },
];

const SEARCHBAR_STATE_TEACHER_APPLICATION = [
  { id: 1, label: "예약대기", value: "re" },
  { id: 2, label: "확인중", value: "ch" },
];
