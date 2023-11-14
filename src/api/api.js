import axios from "axios";

const api = axios.create({
  baseURL: `https://d3a9lg5vn1dub1.cloudfront.net/api`,
});

api.interceptors.request.use((cfg => {
  let token = localStorage.getItem("authToken")

  cfg.headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  return cfg;
}))

export default api;
