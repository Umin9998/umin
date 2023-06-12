import React from "react";
import Link from "next/link";
// import NavigatePage from "../navigatePage/NavigatePage";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import {
  NOWTAB_APPLECATION_ADVICE_LIST_TITLE,
  NOWTAB_COMPLETION_ADVICE_LIST_TITLE,
  STATE_VALUE,
} from "../model/model";

import NavigatePage from "./NavigatePage";
import { styled } from "styled-components";

const AdviceList = ({
  applicationList,
  applicationListTotalCount,
  currentPageNumber,
  fetchApplicationList,
  nowActivatedTabValue,
  handlePageChange,
}: any) => {
  const goToDetailPageUrl = (id: number): string | undefined => {
    switch (nowActivatedTabValue) {
      case "application":
        return `/detailApply/${id}`;
      case "completion":
        return `/detailComplete/${id}`;
    }
  };

  const ListFormDesktop = styled.div`
    width: 1000px;
    margin: 0 auto;
    margin-top: 58px;
    border-radius: 8px;
  `;

  // .listFormDesktop {
  //   display: none;
  //   width: 100%;
  // }
  const ListFormMobile = styled.div`
    display: none;
  `;

  const FormStyle = styled.div`
    width: 100%;
  `;
  const ListItems = styled.ul`
    display: flex;
    justify-content: space-around;
    padding: 20px 30px;
    margin-top: 58px;
    border: 1px solid #dfe0eb;
    color: #9fa2b4;
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    li {
      padding: 0 20px;
      text-align: center;
    }
  `;
  //gotodetailPageUrl

  const ContentsItems = styled.div`
    border-bottom: 1px solid #dfe0eb;
    border-left: 1px solid #dfe0eb;
    border-right: 1px solid #dfe0eb;
    :hover {
      background-color: #e9edfe;
      opacity: 0.9;
      transition: 0.4s;
  `;
  const HoverUl = styled.ul`
    display: flex;
    padding: 24px;
    border-bottom: none;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    li {
      color: #808080;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      div {
        width: 62px;
        padding: 3px 6px;
        margin-left: 10px;
        border-radius: 5px;
        background-color: #4e28ba;
        color: #fff;
        font-size: 13px;
      }
    }
  `;
  const State = styled.li`
    width: 80px;

    color: #6e7ae9;
    text-align: center;
  `;

  //mobile

  const ItemTop = styled.ul`
    display: flex;
  `;
  const ItemBot = styled.ul`
    display: flex;
    margin-top: 4px;
  `;
  return (
    <div className="wrap">
      <ListFormDesktop>
        {" "}
        <ListItems>
          {nowActivatedTabValue === "application" && (
            <>
              {NOWTAB_APPLECATION_ADVICE_LIST_TITLE.map((list: any) => (
                <li key={list.id}>{list.content}</li>
              ))}
            </>
          )}
          {nowActivatedTabValue === "completion" && (
            <>
              {NOWTAB_COMPLETION_ADVICE_LIST_TITLE.map((list: any) => (
                <li key={list.id}>{list.content}</li>
              ))}
            </>
          )}
        </ListItems>
      </ListFormDesktop>
      <FormStyle>
        <ListFormDesktop>
          {applicationList?.map(
            (
              {
                id,
                counseling_type,
                title,
                desiredClass,
                desiredDate,
                fixedDate,
                fixedClass,
                state,
                teacherName,
              }: any,
              index: any
            ) => (
              // Type error: Type 'string | undefined' is not assignable to type 'Url'.
              // Non-null assertion operator
              // https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
              <Link href="/" key={id}>
                <ContentsItems>
                  <HoverUl>
                    <li>
                      {applicationListTotalCount -
                        (currentPageNumber - 1) * 10 -
                        index}
                    </li>
                    <li>{counseling_type}</li>
                    <li> {title}</li>
                    <li>{teacherName}</li>
                    <li>
                      {STATE_VALUE?.[state] === "예약대기" && (
                        <>
                          {dayjs(desiredDate).format("YYYY.MM.DD.(dd)")}
                          <div>{desiredClass}</div>
                        </>
                      )}
                      {STATE_VALUE?.[state] === "확인중" && (
                        <>
                          {dayjs(desiredDate).format("YYYY.MM.DD.(dd)")}
                          <div>{desiredClass}</div>
                        </>
                      )}
                      {STATE_VALUE?.[state] === "예약확정" && (
                        <>
                          {dayjs(desiredDate).format("YYYY.MM.DD.(dd)")}
                          <div>{desiredClass}</div>
                        </>
                      )}
                      {STATE_VALUE?.[state] === "상담완료" && (
                        <>
                          {dayjs(fixedDate).format("YYYY.MM.DD.(dd)")}
                          <div>{fixedClass}</div>
                        </>
                      )}
                    </li>
                    {STATE_VALUE?.[state] ? (
                      <State>{STATE_VALUE?.[state]}</State>
                    ) : (
                      <State>상태없음</State>
                    )}
                  </HoverUl>
                </ContentsItems>
              </Link>
            )
          )}
        </ListFormDesktop>
        <ListFormMobile>
          {" "}
          <div>
            {applicationList?.map(
              (
                {
                  id,
                  counseling_type,
                  title,
                  teacherName,
                  desiredClass,
                  desiredDate,
                  fixedDate,
                  fixedClass,
                  state,
                }: any,
                index: any
              ) => (
                <Link href="/" key={id}>
                  {/* gotodegailPageUrl(Id) */}
                  <ContentsItems>
                    <ItemTop>
                      <li>
                        {applicationListTotalCount -
                          ((currentPageNumber - 1) * 10 + index)}
                      </li>
                      <li>{counseling_type}</li>
                      <li>{title}</li>
                    </ItemTop>
                    <ItemBot>
                      <li>{teacherName}</li>
                      <li>
                        {applicationList.state === "com" ? (
                          <>
                            {dayjs(fixedDate).format("YYYY.MM.DD.(dd)")}
                            <div>{fixedClass}</div>
                          </>
                        ) : (
                          <>
                            {dayjs(desiredDate).format("YYYY.MM.DD.(dd)")}
                            <div>{desiredClass}</div>
                          </>
                        )}
                      </li>
                      {STATE_VALUE?.[state] ? (
                        <li>{STATE_VALUE?.[state]}</li>
                      ) : (
                        <li>상태없음</li>
                      )}
                    </ItemBot>
                  </ContentsItems>
                </Link>
              )
            )}
          </div>
        </ListFormMobile>
        <NavigatePage
          fetchApplicationList={fetchApplicationList}
          currentPageNumber={currentPageNumber}
          applicationListTotalCount={applicationListTotalCount}
          handlePageChange={handlePageChange}
        />
        {/* NavigatePage추가해야함  */}
      </FormStyle>
    </div>
  );
};

export default AdviceList;
