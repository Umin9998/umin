import axios from "axios";

export const getAllMajor = () =>
  axios.get("https://apitest20230605165223.azurewebsites.net/allMajor");

const apiKey = "8507bb86e10766698607ebb310cfa6fb";
const url = `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=MAJOR&contentType=json&gubun=univ_list&univSe=univ`;
export const getCareer = () => axios.get(url);
