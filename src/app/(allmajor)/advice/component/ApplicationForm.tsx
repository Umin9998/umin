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

  return <div></div>;
};

export default AdviceApplicationForm;
