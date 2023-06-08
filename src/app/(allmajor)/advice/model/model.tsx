export const ADVICE_FORMDATA_INPUT_TYPE = [
  {
    id: "fk_username",
  },

  {
    id: "fk_teacher_username",
  },
  {
    id: "teacherName",
  },

  {
    id: "desiredDate",
  },
  {
    id: "desiredClass",
  },
  {
    id: "title",
  },
  {
    id: "purpose",
  },
  {
    id: "counseling_type",
  },
];

export const ADVICE_TYPE_OF_COUNSELING = [
  {
    id: "진로",
    content: "진로상담",
    checked: "진로",
    value: "career",
  },
  {
    id: "학업",
    content: "학업상담",
    checked: "학업",
    value: "study",
  },
  {
    id: "진학",
    content: "진학상담",
    checked: "진학",
    value: "promotion",
  },
  {
    id: "기타",
    content: "기타",
    checked: "기타",
    value: "etc",
  },
];

//한글로된것만 있으면 좋지않다. id를 넣어서 관리하는게 좋다.
//id는 고유값
export const ADVICE_DATE_OF_COUNSELING = [
  {
    id: "d1",
    content: "2023-06-30",
    hidden: true,
  },
  {
    id: "d2",
    content: "2023-06-30",
  },
  {
    id: "d3",
    content: "2023-06-30",
  },
  {
    id: "d4",
    content: "2023-06-30",
  },
  {
    id: "d5",
    content: "2023-06-30",
  },
  {
    id: "d6",
    content: "2023-06-30",
  },
  {
    id: "d7",
    content: "2023-06-30",
  },
  {
    id: "d8",
    content: "2023-06-30",
  },
];

export const ADVICE_PERIOD_OF_COUNSELING = [
  {
    id: "period1",
    content: "교시 선택",
    hidden: true,
  },
  {
    id: "period2",
    content: "1교시",
  },
  {
    id: "period3",
    content: "2교시",
  },
  {
    id: "period4",
    content: "3교시",
  },
  {
    id: "period5",
    content: "4교시",
  },
  {
    id: "period6",
    content: "점심시간",
  },
  {
    id: "period7",
    content: "5교시",
  },
  {
    id: "period8",
    content: "6교시",
  },
];

export const ADVICE_TEACHER_OF_COUNSELING = [
  {
    id: "teacher1",
    content: "희망 선생님 선택",
    hidden: true,
  },
  {
    id: "teacher2",
    content: "김태진 선생님",
    userid: "cassw1",
  },
  {
    id: "teacher3",
    content: "정운찬 선생님",
    userid: "jeong",
  },
];

export const ADVICE_CONTENTS_OF_COUNSELING = [
  {
    id: "teachername",
    titleContent: "담임교사",
    placeholder: "담임 선생님 이름을 입력해 주세요.",
    inputType: "input",
    value: "teachername",
  },
  {
    id: "title",
    titleContent: "제목",
    placeholder: "제목을 입력해 주세요.",
    inputType: "input",
    maxLength: 30,
    value: "title",
  },
  {
    id: "purpose",
    titleContent: "상담목적",
    placeholder: "내용을 입력해 주세요",
    inputType: "textarea",
    value: "purpose",
  },
];
