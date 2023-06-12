"use client";

import React, { useState, useEffect } from "react";
//import { useRouter } from "next/nevigation";
import ListThirdSwitchBtn from "../component/ListThirdSwitchBtn";
import ListSearchBar from "../component/ListSearchBar";
import AdviceListTeacher from "../component/ListTeacher";
import AdviceBanner from "../component/AdviceBanner";
import AdviceSubNav from "../component/AdviceSubNav";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

//신청서목록 데이터 타입
interface ApplicationListData {
  [key: string]: string;
  counseling_type: string;
  fk_teacher_username: string;
  teacherName: string;
  desiredClass: string;
  title: string;
  purpose: string;
}

const ListTeacherPage = () => {
  //const router = useRouter(); //router 사용 > next/navigation install 여부?
  //const baseUrl = 'https://careerdesigntest.azurewebsites.net/cc/teacher'; //baseUrl 저장
  //const baseUrl = 'https://localhost:44336/cc/teacher'; //baseUrl 저장
  const baseUrl = "https://careerdesigntest.azurewebsites.net/cc/teacher";
  const _pageSize = 10; //한 페이지에 보여줄 데이터 개수
  const startDate = dayjs(new Date()); //시작일
  const endDate = dayjs(new Date().setDate(new Date().getDate() + 180)); //종료일
  const [applicationList, setApplicationList] = useState<ApplicationListData[]>(
    []
  ); //신청서목록 데이터 리스트 저장
  const [applicationListTotalCount, setApplicationListTotalCount] =
    useState<number>(0); //신청서목록 데이터 총 개수 저장
  const [nowActivatedTabValue, setNowActivatedTabValue] =
    useState<string>("application"); //현재 활성화된 탭 저장, 초기값 'application'
  const [currentCriterionState, setCurrentCriterionState] =
    useState<string>("init"); //달력 검색시 criterion 기본상태 값(초기값 init)
  const [nowSearchWordValue, setNowSearchWordValue] = useState<string>(""); //검색어 상태값 //화면에 보이는 값
  const [nowSearchTypeValue, setNowSearchTypeValue] = useState<string>(""); //검색타입 상태값 //화면에 보이는 값
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1); //현재 페이지 번호
  const [nowSearchStateData, setNowSearchStateData] = useState<string>("re"); //API 요청시 검색타입 상태값 //API에 보내는 값
  const [nowStartDateValue, setNowStartDateValue] = useState(
    dayjs(startDate).format("YYYY-MM-DD")
  ); //현재 시작일 상태값 //화면에 보이는 값
  const [nowEndDateValue, setNowEndDateValue] = useState(
    dayjs(endDate).format("YYYY-MM-DD")
  ); //현재 종료일 상태값 //화면에 보이는 값

  // const [initialStartDate, setInitialStartDate] = useState(
  //   dayjs(subDays(Date.now(), 365)).format('YYYY-MM-DD')
  // );
  // const [initialEndDate, setInitialEndDate] = useState(
  //   dayjs(Date.now()).format('YYYY-MM-DD')
  // );

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
  };

  //날짜 검색시 실행되는 함수
  const nowSearchDateValueHandler = (start: string, end: string) => {
    setNowStartDateValue(start); //달력 검색시 날짜 값 변경
    setNowEndDateValue(end); //달력 검색시 날짜 값 변경
    setCurrentCriterionState("search"); //달력 검색시 criterion 상태 변경
  };

  //탭 변경시 실행되는 함수
  const nowActivatedTabValueHandler = (inputValue: string) => {
    resetSearchFields();
    setNowActivatedTabValue(inputValue);
  };

  //useEffect 사용시 스크롤 위치 유지 됨
  useEffect(() => {
    window.scrollTo(scrollX, scrollY);
  });

  //상담신청 텝에 진입시 초기목록 불러오기
  useEffect(() => {
    setCurrentPageNumber(currentPageNumber);
    fetchApplicationList(currentPageNumber); //최초 렌더링시
  }, [nowActivatedTabValue]); //nowActivatedTabValue 값 변경시 페이지 재렌더링

  const fetchApplicationList = (pageNum: number) => {
    let select = "";
    switch (nowActivatedTabValue) {
      case "application":
        select = "re";
        break;
      case "reservation":
        select = "con";
        break;
      case "completion":
        select = "com";
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
        //criterionState = { init: 'def', search: 're' }; (def삭제)
        criterionState = { init: "re", search: "re" };
        break;
      case "reservation":
        criterionState = { init: "con", search: "con" };
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

    fetch(
      `${baseUrl}/${select}/${pageNum}/${_pageSize}/${nowStartDateValue}/${nowEndDateValue}?_search=${searchWordValue}&_filterType=${nowSearchTypeValue}&_criterion=${criterionState[currentCriterionState]}`
    )
      .then((res) => res.json()) //결과값을 json으로 변환
      .then((data) => {
        console.log("확인", data);
        setApplicationList(data.counselingUserList); //data.counselingUserList를 applicationList에 저장
        setApplicationListTotalCount(data.totalCount); //data.totalCount를 applicationListTotalCount에 저장
        // router.push(
        //   `/listTeacher?page=${pageNum}&pageSize=${
        //     _pageSize * pageNum
        //   }?_search=${searchWordValue}&_filterType=${nowSearchTypeValue}&_criterion=${
        //     criterionState[currentCriterionState]
        //   }`
        // );
      });
  };

  return (
    <div>
      <AdviceBanner />
      <AdviceSubNav />
      <div>
        <p>상담내역 목록</p>
      </div>
      <ListThirdSwitchBtn
        nowActivatedTabValueHandler={nowActivatedTabValueHandler}
        nowActivatedTabValue={nowActivatedTabValue}
        fetchApplicationList={fetchApplicationList}
      />
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
      />
      <AdviceListTeacher
        applicationList={applicationList}
        applicationListTotalCount={applicationListTotalCount}
        currentPageNumber={currentPageNumber}
        fetchApplicationList={fetchApplicationList}
        nowActivatedTabValue={nowActivatedTabValue}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

// export async function getStaticProps() {
//   return {
//     // https://nextjs.org/docs/basic-features/data-fetching/get-static-props
//     // the props will be passed to the page component as props
//     props: {
//       pageTitle: "listTeacher",
//     },
//   };
// }

export default ListTeacherPage;
