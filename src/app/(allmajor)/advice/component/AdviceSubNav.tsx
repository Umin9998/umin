"use client";

import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";

import homeIcon from "../image/homeIcon.png";
import bannerAdvice from "../image/bannerAdvice.png";
import bannerAdviceMin from "../image/bannerAdviceMin.png";
import bracket from "../image/bracketIcon.png";

export default function AdviceSubNav() {
  const SubNav = styled.div`
    width: 100%;
    height: 48px;
    min-width: 450px;
    border-bottom: 1px solid #e1e1e1;
    line-height: 48px;
    font-weight: 500;
    box-sizing: border-box;
  `;
  const Wrap = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;

    font-size: 14px;
  `;
  const ImageWrap = styled.div``;
  const NavTitle = styled.div`
    display: flex;
    align-items: center;
    color: #353535;
    margin-top: -3px;

    font-weight: 500;
    p {
      text-decoretion: none;
      padding: 0 5px 0 6px;
      color: #353535;
    }
  `;
  return (
    <div>
      <SubNav>
        <Wrap>
          <ImageWrap>
            {" "}
            <Image
              src={homeIcon}
              alt="home"
              width="13.33"
              height="11.33"
            ></Image>
          </ImageWrap>
          <ImageWrap>
            <Image src={bracket} alt="bracket" width="5.1" height="9.3"></Image>
          </ImageWrap>

          <NavTitle>
            <p>상담</p>
            <Image src={bracket} alt="bracket" width="5.1" height="9.3" />
          </NavTitle>
          <NavTitle>
            <Link
              href="/advice"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              <p>상담신청</p>
            </Link>
          </NavTitle>
          <NavTitle>
            <Link
              href="/advice"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              <p>상담내역</p>
            </Link>
          </NavTitle>
          <NavTitle>
            <Link
              href="/advice"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              <p>상담관리</p>
            </Link>
          </NavTitle>
          <NavTitle>
            <Link
              href="/advice"
              style={{
                textDecoration: "none",
              }}
            >
              {" "}
              <p>상담통계</p>
            </Link>
          </NavTitle>
        </Wrap>
      </SubNav>
      {/* 페이지 완성되면 경로 추가  */}
    </div>
  );
}
