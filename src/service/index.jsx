import axios from "axios";

const api = axios.create({
  baseURL: "http://34.85.35.18:3000/api",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});
export default api;
