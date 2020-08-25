import axios from "axios";

const loadCovidData = () => {
  return axios.get("https://disease.sh/v3/covid-19/gov/IN", {
    accept: "application/json",
  });
};

export default loadCovidData;
