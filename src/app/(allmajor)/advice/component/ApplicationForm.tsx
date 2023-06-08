"use client";

import React, { useState } from "react";
import styled from "styled-components";

import {
  ADVICE_FORMDATA_INPUT_TYPE,
  ADVICE_TYPE_OF_COUNSELING,
  ADVICE_PERIOD_OF_COUNSELING,
  ADVICE_TEACHER_OF_COUNSELING,
  ADVICE_CONTENTS_OF_COUNSELING,
  ADVICE_DATE_OF_COUNSELING,
} from "../model/model";

// 상담 신청서 입력값 타입
interface AdviceApplicationFormInput {
  [key: string]: string;
  fk_username: string;
  fk_teacher_username: string;
  teachername: string;
  desiredDate: string;
  desiredClass: string;
  title: string;
  purpose: string;
  counseling_type: string;
}

interface InputContents {
  width: string;
}

const AdviceApplicationForm = () => {
  const [selectedType, setSelectedType] = useState("진로");
  const [selectedTeacher, setSelectedTeacher] = useState("cassw1");
  const [selectedDate, setselectedDate] = useState("YYYY.MM.DD");

  // init
  const adviceApplicationFormInputInit: AdviceApplicationFormInput = {
    fk_username: "gudwns128",
    fk_teacher_username: "cassw1",
    teachername: "cassw1",
    desiredDate: "2023.01.11",
    desiredClass: "1교시",
    title: "",
    purpose: "",
    counseling_type: "진로",
  };

  const [adviceApplicationFormInput, setAdviceApplicationFormInput] =
    useState<AdviceApplicationFormInput>(adviceApplicationFormInputInit);

  const handleApplicationFormChange = (e: any) => {
    let value_ = e.target.value;

    if (e.target.name === "fk_teacher_username") {
      ADVICE_TEACHER_OF_COUNSELING.map((teacher) => {
        if (teacher.content === e.target.value) {
          //console.log(teacher.content);
          //value_ = teacher.userName;
          setSelectedTeacher(teacher.content);
          //console.log(value_);
        }
      });
    }

    setAdviceApplicationFormInput({
      ...adviceApplicationFormInput,
      [e.target.name]: value_,
    });

    //console.log(e.target.name);
    //console.log(e.target.value);
    if (e.target.name === "counseling_type") setSelectedType(value_);
    if (e.target.name === "desiredDate") setselectedDate(value_);
  };

  function createFormData(): FormData {
    const formdata = new FormData(); //FormData 생성

    for (let type of ADVICE_FORMDATA_INPUT_TYPE) {
      if (type.id !== "fk_teacher_username")
        formdata.append(type.id, adviceApplicationFormInput[type.id]);
    }

    formdata.append("fk_teacher_username", selectedTeacher);

    console.log("[FormData]");

    return formdata; //FormData 리턴
  }

  //formdata에 담아서 보내기
  const sendPostFormData = async (): Promise<void> => {
    let isAllDataFilled = true;
    let emptyData_: string;

    console.log("[Validation]");

    Object.keys(adviceApplicationFormInput).map((key) => {
      let property_ = adviceApplicationFormInput[key];
      console.log(key, ":", property_);
      if (property_ === "") {
        isAllDataFilled = false;
        emptyData_ = key;
      }
    });

    if (!isAllDataFilled) {
      const msg = "필수 입력 및 선택을 확인해 주세요";
      alert(msg);
      return;
    }

    //CareerCounseling/cc/save API 호출
    const applicationFormFetch: Response = await fetch(
      "https://careerdesigntest.azurewebsites.net/v2/api/Student/cc/save",
      {
        method: "POST",
        body: createFormData(),
      }
    );

    const response = await applicationFormFetch.json();

    if (response.responseMessage === "success") {
      alert("성공");
      console.log("상담 신청 완료");
    } else {
      alert(response.responseMessage);
      console.log("상담 신청 실패");
    }
  };
  //styled-components
  const Button = styled.button`
    width: 200px;
    height: 60px;
    background-color: #4713da;
    color: #fff;
  `;

  const BtnWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 36px;
  `;

  const FormContainer = styled.div`
    display: flex;
    width: 100%;
    min-width: 540px;
  `;
  const FormContainerWrap = styled.div`
    display: flex;
    width: 1000px;
    padding: 48px;
    margin: 0 auto;
    background-color: #f9f9ff;
  `;
  const CommonTitle = styled.div`
    display: flex;
    width: 110px;
    height: 52px;
    align-items: center;
    margin-right: 60px;
    font-weight: 500;

    span {
      margin-left: 8px;
      color: red;
    }
  `;

  const CounselingType = styled.div`
    display: flex;
    margin-bottom: 24px;
    font-size: 16px;
    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 55px;
    }
    lable {
      margin-right: 30px;
      line-height: 18px;
      cursor: pointer;
    }
    input {
      width: 19px;
      height: 19px;
      margin-right: 8px;
      cursor: pointer;
    }
  `;
  const CounselingDate = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 24px;
    font-size: 16px;
    div {
      display: flex;
    }
    lable {
      position: relative;
      display: flex;
      align-items: center;
      padding: 16px 20px;
      margin-right: 10px;
      border: 1px solid #e9e9e9;
      border-radius: 12px;
      background-color: #fff;
      box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
      font-size: 16px;
      cursor: pointer;
    }
    input {
      width: 145px;
      position: relative;
      cursor: pointer;
    }
  `;

  const PeriodSelection = styled.div`
    display: flex;
    margin-bottom: 24px;
    font-size: 16px;
    lable {
      display: flex;
    }
    select {
      width: 311px;
      padding: 16px 20px;
      border: 1px solid #e9e9e9;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
      font-size: 16px;
      cursor: pointer;
    }
  `;

  const TeacherSelection = styled.div`
    display: flex;
    margin-bottom: 24px;
    font-size: 16px;
    lable {
      display: flex;
    }
    select {
      width: 311px;
      padding: 16px 20px;
      border: 1px solid #e9e9e9;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
      font-size: 16px;
      cursor: pointer;
    }
  `;

  const InputContents = styled.div`
    align-items: center;
    margin-bottom: 24px;
    font-size: 16px;

    div {
      display: flex;
      align-items: center;
      width: 311px;
      padding: 16px 10px;
      border: 1px solid #e9e9e9;
      border-radius: 12px;
      background-color: #fff;
      box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
      font-size: 16px;
      cursor: pointer;

      label {
        input {
          width: 311px;

          border: none;
        }
        textarea {
          border: none;
          width: 311px;
          height: 220px;
        }
      }
    }
  `;
  return (
    <FormContainer>
      <FormContainerWrap>
        <form>
          <CounselingType>
            <CommonTitle>
              상담유형
              <span>*</span>
            </CommonTitle>
            <div>
              {ADVICE_TYPE_OF_COUNSELING.map((type) => (
                <label key={type.id}>
                  <input
                    type="radio"
                    name="counseling_type"
                    checked={selectedType === type.id}
                    onChange={handleApplicationFormChange}
                    value={type.id}
                  />
                  <span>{type.content}</span>
                </label>
              ))}
            </div>
          </CounselingType>
          <CounselingDate>
            <div>
              <CommonTitle>
                날짜
                <span>*</span>
              </CommonTitle>
              <label htmlFor="desiredDate">
                <input
                  type="text"
                  name="desiredDate"
                  onChange={handleApplicationFormChange}
                  value={selectedDate}
                />
              </label>
            </div>
          </CounselingDate>

          <PeriodSelection>
            <label htmlFor="desiredClass">
              <CommonTitle>
                시간
                <span>*</span>
              </CommonTitle>
              <select
                name="desiredClass"
                onChange={handleApplicationFormChange}
                value={adviceApplicationFormInput.desiredClass}
              >
                {ADVICE_PERIOD_OF_COUNSELING.map((period) => (
                  <option
                    key={period.id}
                    value={period.content}
                    hidden={period.hidden && true}
                  >
                    {period.content}
                  </option>
                ))}
              </select>
            </label>
          </PeriodSelection>
          <TeacherSelection>
            <label htmlFor="fk_teacher_username">
              {" "}
              <CommonTitle>
                선생님
                <span>*</span>
              </CommonTitle>
              <select
                name="fk_teacher_username"
                onChange={handleApplicationFormChange}
                value={adviceApplicationFormInput.fk_teacher_username}
              >
                {ADVICE_TEACHER_OF_COUNSELING.map((teacher) => (
                  <option
                    key={teacher.id}
                    value={teacher.content}
                    hidden={teacher.hidden && true}
                  >
                    {teacher.content}
                  </option>
                ))}
              </select>
            </label>
          </TeacherSelection>

          <div></div>
          {ADVICE_CONTENTS_OF_COUNSELING.map((content) => (
            <InputContents key={content.id}>
              {" "}
              <p>
                {content.titleContent}
                <span>*</span>
              </p>
              <div>
                {" "}
                <label>
                  {content.inputType === "input" && (
                    <input
                      type="text"
                      name={content.value}
                      onChange={handleApplicationFormChange}
                      value={
                        content.value &&
                        (adviceApplicationFormInput?.[content.value] || "")
                      }
                      // maxLength={content.maxLength && content.maxLength}
                      placeholder={content.placeholder}
                    />
                  )}
                  {content.inputType === "textarea" && (
                    <textarea
                      name={content.id}
                      onChange={handleApplicationFormChange}
                      placeholder={content.placeholder}
                    />
                  )}
                </label>
              </div>
            </InputContents>
          ))}
          <BtnWrap>
            <Button onClick={sendPostFormData}>상담신청</Button>
          </BtnWrap>
        </form>
      </FormContainerWrap>
    </FormContainer>
  );
};

export default AdviceApplicationForm;
