import { styled } from "styled-components";
import Image from "next/image";
import BannerImage from "../image/bannerAdvice.png";

export default function AdviceBanner() {
  const Banner = styled.div`
    position: relative;
    width: 100%;
    height: 270px;
    min-width: 450px;
    margin: auto 0;
    margin-top: 80px;
    background-color: #e1efff;
    white-space: pre-wrap;
  `;
  const AdviceBannerDesktop = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 500px;

      h2 {
        margin-bottom: 22px;
        color: #071802;
        font-size: 38px;
        font-weight: 700;
        line-height: 55px;
      }
      h3 {
        color: #333;
        font-size: 18px;
        font-weight: 500;
        line-height: 29px;
      }
    }
  `;
  const ImageWrap = styled.div`
    width: 540px;
    height: 270px;
  `;
  return (
    <div>
      <Banner>
        <AdviceBannerDesktop>
          <div>
            <h2>상담</h2>
            <h3>
              내가 원하는 직업, 학과, 과목 선택에 고민이 있다면 <br />
              상담을 받아 보세요.
            </h3>
          </div>
          <ImageWrap>
            <Image
              src={BannerImage}
              alt="BannerImage"
              width={540}
              height={270}
            ></Image>
          </ImageWrap>
        </AdviceBannerDesktop>
      </Banner>
    </div>
  );
}
