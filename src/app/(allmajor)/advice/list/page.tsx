"use client";

import { useState, useEffect } from "react";
import AdviceBanner from "../component/AdviceBanner";
import AdviceList from "../component/AdviceList";
import AdviceSubNav from "../component/AdviceSubNav";
import ListSearchBar from "../component/ListSearchBar";
import ListSwitchBtn from "../component/ListSwitchBtn";

import dayjs from "dayjs";

import styled from "styled-components";

const AdviceListWrap = styled.div`
  width: 1000px;

  margin: 0 auto;
`;

interface ApplicationListData {
  [key: string]: string;
  counseling_type: string;
  fk_teacher_username: string;
  teacherName: string;
  desiredClass: string;
  title: string;
  purpose: string;
}
export default function page() {
  const [applicationList, setApplicationList] = useState<ApplicationListData[]>(
    []
  ); //신청서목록 데이터 리스트 저장
  const [applicationListTotalCount, setApplicationListTotalCount] = useState(0);
  const [nowActivatedTabValue, setNowActivatedTabValue] =
    useState("application"); //현재 활성화된 탭 값
  const _pageSize = 10;
  const startDate = dayjs(new Date()); //시작일
  const endDate = dayjs(new Date().setDate(new Date().getDate() + 180)); //종료일
  const [currentCriterionState, setCurrentCriterionState] =
    useState<string>("init"); //달력 검색시 criterion 기본상태 값(초기값 init)
  const [nowSearchWordValue, setNowSearchWordValue] = useState<string>(""); //검색어 상태값 //화면에 보이는 값
  const [nowSearchTypeValue, setNowSearchTypeValue] = useState<string>(""); //검색타입 상태값 //화면에 보이는 값
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1); //페이지네이션 페이지 번호
  const [nowSearchStateData, setNowSearchStateData] = useState<string>("re"); //API 요청시 검색타입 상태값 //API에 보내는 값
  const [nowStartDateValue, setNowStartDateValue] = useState(
    dayjs(startDate).format("YYYY-MM-DD")
  ); //현재 시작일 상태값 //화면에 보이는 값
  const [nowEndDateValue, setNowEndDateValue] = useState(
    dayjs(endDate).format("YYYY-MM-DD")
  ); //현재 종료일 상태값 //화면에 보이는 값
  // const [storeUrl, setStoreUrl] = useState(router.asPath); //스토어 url 저장

  const [counter, setCounter] = useState<number>(0);

  // const storeUrlBefore = (Url: any) => {
  //   console.log('storeUrlBefore 실행됨');
  //   setStoreUrl(router.asPath);
  //   localStorage.setItem('storeUrl', storeUrl);
  //   router.asPath = Url;
  // };

  //검색후 다른 탭으로 이동시 검색어 초기화 함수
  const resetSearchFields = () => {
    setNowSearchWordValue("");
    setNowSearchTypeValue("");
    setCurrentCriterionState("init");
    setCurrentPageNumber(1);
  };

  //페이지네이션 페이지 번호 변경시 실행되는 함수
  const handlePageChange = (currentPageNumber: number) => {
    //페이지네이션 페이지 번호 변경시
    setCurrentPageNumber(currentPageNumber);
    fetchApplicationList(currentPageNumber); //신청서목록 데이터를 요청하는데 currentPageNumber 인자로 넘겨줌
  };

  //사용자가 한글로 검색어를 입력했을 때, API에 보내는 검색타입 상태값을 변경해주는 함수
  const handleStateValueConversion = (event: any, newInputValue: string) => {
    let stateData: string;
    switch (newInputValue) {
      case "예약대기":
        stateData = "re";
        break;
      case "예약확정":
        stateData = "con";
        break;
      case "확인중":
        stateData = "ch";
        break;
      default:
        stateData = "";
    }
    setNowSearchWordValue(newInputValue);
    setNowSearchStateData(stateData);
  };

  //검색어 상태값 변경 함수
  const handleNowSearchWordValue = (e: any) => {
    console.log("검색어");
    console.log(e.target.value);

    setNowSearchWordValue(e.target.value);
  };
  //검색타입 상태값 변경 함수
  const handleNowSearchTypeValue = (e: any) => {
    console.log("검색 유형");
    console.log(e.target.value);

    setNowSearchTypeValue(e.target.value);

    setNowSearchWordValue("");
  };

  //날짜 검색시 실행되는 함수
  const nowSearchDateValueHandler = (start: string, end: string) => {
    setNowStartDateValue(start); //달력 검색시 날짜 값 변경
    setNowEndDateValue(end); //달력 검색시 날짜 값 변경
    setCurrentCriterionState("search"); //달력 검색시 criterion 상태 변경
  };

  //탭 변경시 실행되는 함수
  const nowActivatedTabValueHandler = (inputValue: string) => {
    console.log("nowActivatedTabValueHandler");
    console.log(inputValue);

    resetSearchFields();
    setNowActivatedTabValue(inputValue);

    //fetchApplicationList(currentPageNumber);
    setCounter(counter + 1); // 페이지 재호출
  };

  //useEffect 사용시 스크롤 위치 유지 됨
  useEffect(() => {
    window.scrollTo(scrollX, scrollY);
  });

  //상담신청 텝에 진입시 초기목록 불러오기
  useEffect(() => {
    setCurrentPageNumber(currentPageNumber);
    fetchApplicationList(currentPageNumber); //최초 렌더링시
  }, [nowActivatedTabValue, counter]); //nowActivatedTabValue 값 변경시 페이지 재렌더링

  const fetchApplicationList = (pageNum: number) => {
    let select = "";
    switch (nowActivatedTabValue) {
      case "application":
        select = "";
        break;
      case "completion":
        select = "/com";
        break;
    }

    type CriterionStateType = {
      [key: string]: string;
      init: string;
      search: string;
    };

    //let criterionState: CriterionStateType = { init: 'def', search: 're' };
    let criterionState: CriterionStateType = { init: "re", search: "re" };

    //탭에 따라 criterionState 값 변경
    switch (nowActivatedTabValue) {
      case "application":
        //criterionState = { init: 'def', search: 're' };
        criterionState = { init: "re", search: "re" };
        // criterionState = { init: 'def', search: 'con' };
        break;
      case "completion":
        criterionState = { init: "com", search: "com" };
        break;
    }

    setCurrentPageNumber(pageNum); //현재 페이지 인덱스 변경
    // setcurrentPageNumber(1); //1페이지로 초기화 하면 1페이지만 보여줌
    let searchWordValue = nowSearchWordValue; //nowSearchWordValue를 searchWordValue에 넣어줌
    if (nowSearchTypeValue === "state") {
      searchWordValue = nowSearchStateData; //nowSearchStateData를 searchWordValue에 넣어줌
    }

    console.log("searchWordValue");
    console.log(searchWordValue);

    fetch(
      //`https://careerdesigntest.azurewebsites.net/cc${select}/${pageNum}/${_pageSize}/${nowStartDateValue}/${nowEndDateValue}?_search=${searchWordValue}&_filterType=${nowSearchTypeValue}&_criterion=${criterionState[currentCriterionState]}`
      //`https://localhost:44336/cc${select}/${pageNum}/${_pageSize}/${nowStartDateValue}/${nowEndDateValue}?_search=${searchWordValue}&_filterType=${nowSearchTypeValue}&_criterion=${criterionState[currentCriterionState]}`
      //`https://localhost:44336/v2/api/Student/cc${select}/${pageNum}/${_pageSize}/${nowStartDateValue}/${nowEndDateValue}?search=${searchWordValue}&filterType=${nowSearchTypeValue}&criterion=${criterionState[currentCriterionState]}`
      `https://careerdesigntest.azurewebsites.net/v2/api/Student/cc${select}/${pageNum}/${_pageSize}/${nowStartDateValue}/${nowEndDateValue}?search=${searchWordValue}&filterType=${nowSearchTypeValue}&criterion=${criterionState[currentCriterionState]}`
    )
      .then((res) => res.json()) //json으로 변환
      .then((data) => {
        console.log("data: ");
        console.log(data);

        // if (data.responseCode !== undefined) {
        //   alert(data.responseMessage);
        //   return;
        // }

        //setApplicationList(data.careerCounselingList); //data.careerCounselingList를 applicationList에 넣어줌
        setApplicationList(data.counselingList); // V2
        setApplicationListTotalCount(data.totalCount); //data.totalCount를 applicationListTotalCount에 넣어줌

        // router.push(
        //   `/list?page=${pageNum}&pageSize=${
        //     _pageSize * pageNum
        //   }?_search=${searchWordValue}&_filterType=${nowSearchTypeValue}&_criterion=${
        //     criterionState[currentCriterionState]
        //   }`
        // );
      });
  };

  return (
    <div>
      <AdviceBanner></AdviceBanner>
      <AdviceSubNav></AdviceSubNav>

      <AdviceListWrap>
        <ListTitle>
          <p>상담내역 목록</p>
        </ListTitle>
        <ListSwitchBtn
          nowActivatedTabValueHandler={nowActivatedTabValueHandler}
          nowActivatedTabValue={nowActivatedTabValue}
          fetchApplicationList={fetchApplicationList}
        ></ListSwitchBtn>
        <ListSearchBar
          nowSearchDateValueHandler={nowSearchDateValueHandler}
          fetchApplicationList={fetchApplicationList}
          nowActivatedTabValue={nowActivatedTabValue}
          handleNowSearchTypeValue={handleNowSearchTypeValue}
          nowSearchTypeValue={nowSearchTypeValue}
          handleNowSearchWordValue={handleNowSearchWordValue}
          nowSearchWordValue={nowSearchWordValue}
          setNowSearchWordValue={setNowSearchWordValue}
          handleStateValueConversion={handleStateValueConversion}
        ></ListSearchBar>
        <AdviceList
          applicationList={applicationList}
          applicationListTotalCount={applicationListTotalCount}
          currentPageNumber={currentPageNumber}
          fetchApplicationList={fetchApplicationList}
          nowActivatedTabValue={nowActivatedTabValue}
          handlePageChange={handlePageChange}
        ></AdviceList>
      </AdviceListWrap>
    </div>
  );
}

const ListTitle = styled.div`
  width: 100%;
  margin: 64px 0 58px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  line-height: 43px;
`;
