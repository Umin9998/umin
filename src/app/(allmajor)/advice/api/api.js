import axios from "axios";

export const postAdvice = () =>
  axios.post(
    "https://careerdesigntest.azurewebsites.net/v2/api/Student/cc/save"
  );
