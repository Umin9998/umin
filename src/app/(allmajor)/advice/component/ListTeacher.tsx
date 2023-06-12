import React from "react";
import Link from "next/link";
//import NavigatePage from '@/components/navigatePage/NavigatePage';
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
dayjs.locale("ko");
import {
  NOWTAB_APPLECATION_ADVICE_LIST_TITLE_TEACHER,
  NOWTAB_RESERVATION_LIST_TITLE_TEACHER,
  NOWTAB_COMPLICATION_LIST_TITLE_TEACHER,
} from "../model/model";

const AdviceListTeacher = ({
  applicationList,
  applicationListTotalCount,
  currentPageNumber,
  fetchApplicationList,
  nowActivatedTabValue,
  handlePageChange,
}: any) => {
  console.log("applicationList", applicationList);
  const goToDetailPageUrl = (id: number) => {
    switch (nowActivatedTabValue) {
      case "application":
        return `/detailApplyTeacher/${id}`;
      case "reservation":
        return `/detailReservationTeacher/${id}`;
      case "completion":
        return `/detailCompleteTeacher/${id}`;
    }
  };

  return (
    <div>
      <div>
        <ul>
          {nowActivatedTabValue === "application" && (
            <>
              {NOWTAB_APPLECATION_ADVICE_LIST_TITLE_TEACHER.map((list: any) => (
                <li key={list.id}>{list.content}</li>
              ))}
            </>
          )}
          {nowActivatedTabValue === "reservation" && (
            <>
              {NOWTAB_RESERVATION_LIST_TITLE_TEACHER.map((list: any) => (
                <li key={list.id}>{list.content}</li>
              ))}
            </>
          )}
          {nowActivatedTabValue === "completion" && (
            <>
              {NOWTAB_COMPLICATION_LIST_TITLE_TEACHER.map((list: any) => (
                <li key={list.id}>{list.content}</li>
              ))}
            </>
          )}
        </ul>
      </div>
      <div>
        <div>
          {applicationList?.map(
            (
              {
                careerCounseling: {
                  id,
                  counseling_type,
                  title,
                  desiredClass,
                  desiredDate,
                  fixedDate,
                  fixedClass,
                  state,
                },
                account,
              }: any,
              index: any
            ) => (
              <Link href="/" key={id}>
                <div>
                  <ul>
                    <li>
                      {applicationListTotalCount -
                        ((currentPageNumber - 1) * 10 + index)}
                    </li>
                    <li>{counseling_type}</li>
                    <li>{title}</li>
                    <li>{account?.name || ""}</li>
                    <li>
                      {account?.grade || ""}학년 {account?.className || ""}반{" "}
                      {account?.num || ""}번
                    </li>
                    {nowActivatedTabValue === "application" ? (
                      <li>
                        {dayjs(desiredDate).format("YYYY.MM.DD.(dd)")}
                        <div>{desiredClass}</div>
                      </li>
                    ) : (
                      <li>
                        {dayjs(fixedDate).format("YYYY.MM.DD.(dd)")}
                        <div>{fixedClass}</div>
                      </li>
                    )}
                  </ul>
                </div>
              </Link>
            )
          )}
        </div>

        <div>
          {applicationList?.map(
            (
              {
                careerCounseling: {
                  id,
                  counseling_type,
                  title,
                  desiredClass,
                  desiredDate,
                  fixedDate,
                  fixedClass,
                },
                account,
              }: any,
              index: any
            ) => (
              <Link href="/" key={id}>
                <div key={id}>
                  <ul>
                    <li>
                      {applicationListTotalCount -
                        ((currentPageNumber - 1) * 10 + index)}
                    </li>
                    <li>{counseling_type}</li>
                    <li>{title}</li>
                  </ul>
                  <ul>
                    <li>{account?.name || ""}</li>
                    <li>
                      {account?.grade || ""}학년 {account?.className || ""}반
                      {account?.num || ""}번
                    </li>
                    {nowActivatedTabValue === "application" ? (
                      <li>
                        {dayjs(desiredDate).format("YYYY.MM.DD.(dd)")}
                        <div>{desiredClass}</div>
                      </li>
                    ) : (
                      <li>
                        {dayjs(fixedDate).format("YYYY.MM.DD.(dd)")}
                        <div>{fixedClass}</div>
                      </li>
                    )}
                  </ul>
                </div>
              </Link>
            )
          )}
        </div>
        {/* <NavigatePage
          fetchApplicationList={fetchApplicationList}
          currentPageNumber={currentPageNumber}
          applicationListTotalCount={applicationListTotalCount}
          handlePageChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
};

export default AdviceListTeacher;
