// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:8000/api/v1/", // change as per your backend
// });

// export default instance;


// // lib/axios.ts (example interceptor)
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1/", // Ensure this matches your backend URL
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  // if (!token) {
  //   console.warn("No access token found in cookies");
  //   // Redirect user to login page
  //   if (typeof window !== "undefined") {
  //     window.location.href = "/login";
  //   }
  //   return config; // Optionally return config, though redirect will take effect
  // }
  console.log("first token", token);
  // If you want to log the token in every request, uncomment the line below
  console.log("Request token:", token);
  // If you want to log the config headers, uncomment the line below
  console.log("Request config headers:", config.headers);
  console.log("token", token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
