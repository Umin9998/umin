import axios from "axios";

export const getAllMajor = () =>
  axios.get("https://apitest20230605165223.azurewebsites.net/allMajor");
