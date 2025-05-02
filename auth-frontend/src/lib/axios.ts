import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/", // change as per your backend
});

export default instance;
