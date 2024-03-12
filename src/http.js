import axios from "axios";

function http() {
  return axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_HOST,
    },
  });
}

export default http;
