"use client";

import { useState } from "react";
import ApplicationForm from "./component/ApplicationForm";
import AdviceSubNav from "./component/AdviceSubNav";
import AdviceBanner from "./component/AdviceBanner";
import { styled } from "styled-components";
export default function Advice() {
  const AdvicePage = styled.div`
    min-width: 540px;
  `;
  const AdviceTitle = styled.div`
    width: 100%;
    margin: 64px 0 58px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    line-height: 43px;
  `;
  return (
    <AdvicePage>
      <AdviceBanner></AdviceBanner>
      <AdviceSubNav></AdviceSubNav>
      <AdviceTitle>상담신청서 작성하기</AdviceTitle>
      <ApplicationForm></ApplicationForm>
    </AdvicePage>
  );
}
//반응형 미디어 쿼리 추가해야함
//상담날짜 배치 오류 해결해야함 이거 왜 안되냐 진짜 어이없어
