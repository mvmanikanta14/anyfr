import axios from "axios";
import TokenService from "./token.service";
import { Router } from "react-router-dom";

import config from '../config/config';


const host = window.location.hostname;
const subdomain = host.split('.')[0];

const baseURLString = config.apiUrl
// const baseURLString = "http://localhost:3000";
// const baseURLString = "http://qaapi.anyibc.com/api";
  // window.location.hostname === "localhost"
  //   ? "http://qaapi.anyibc.com/api"
  //   : "http://localhost:3000";

const instance = axios.create({

     // baseURL: "https://localhost/sumantri/",
     // baseURL: "https://sahityasarada.in/sumantri/",
     // baseURL: "http://www.anyfinancials.in/api/",
      //baseURL: "http://localhost:3000/",
      baseURL: baseURLString,
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "token"/
      },
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // console.log(token,"token send")
      config.headers["Authorization"] = `Bearer ${token}`;   
      //config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    // console.log(config,"config")
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/users/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        // Router.push('/login');
        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;

// let baseURL = '';

// if (window.location.hostname.includes('demo.anyaudit.co.in')) {
//   baseURL = 'https://demo.anyaudit.co.in/sumantri';
// } else if (window.location.hostname.includes('old.anyaudit.co.in')) {
//   baseURL = 'https://old.anyaudit.co.in/sumantri';
// } else {
//   // Default or fallback URL
//   baseURL = '';
// }

// const instance = axios.create({
//   baseURL: baseURL,
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Authorization': 'token' // Uncomment and set the token if needed
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = TokenService.getLocalAccessToken();
//     if (token) {
//       if (window.location.hostname.includes('demo.anyaudit.co.in') ) {
//         config.headers["Authorization"] = token;  // for Spring Boot back-end
//       } else if (window.location.hostname.includes('old.anyaudit.co.in') ) {
//         config.headers["Authorization"] = token; // for Node.js Express back-end
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );