//NB This file will be used across the application for intercepting api request. The purpose of this file is to ensure that there is JWT and CSRF token in every request

import axios from "axios";

//process.env is used to access the values of environment variable in react app
//process.env.REST_API_BASE_URL --- access the base url defined in the .env.development file
//console.log("API URL:", process.env.REST_API_BASE_URL);

console.log("API URL:", import.meta.env.VITE_REST_API_BASE_URL);

//create an Axios instance with default headers
const api = axios.create({
  //base url
  baseURL: `${import.meta.env.VITE_REST_API_BASE_URL}/api`,
  //headers
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  //   Ensures that cookies, authorization headers, or TLS client certificates are sent with cross-site requests.
  // This is necessary when the API uses session-based authentication or when making requests to a different domain while maintaining the user's session

  withCredentials: true,
});

// Function to fetch a new CSRF token and store it
// async function fetchCsrfToken() {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/csrf-token`, { withCredentials: true });
//     const csrfToken = response.data.token;
//     localStorage.setItem('CSRF_TOKEN', csrfToken);
//     return csrfToken;
//   } catch (error) {
//     console.error('Failed to fetch CSRF token', error);
//     throw error;
//   }
// }

/**
 * Axios interceptors are functions that intercept request or response and modify them before they are
 * handled by the then and catch method. These are of two types request interceptor and response
 * interceptor.
 * Request Interceptors: Request interceptors are executed before a request is sent to the server. They allow you to modify the request configuration or
 *  add custom headers, authentication tokens, or any other relevant information.
 * Response Interceptors: Response interceptors are executed when a response is received. They enable you to intercept and handle the
 * response before it is passed to the calling code. Response interceptors are useful for tasks such as error handling, data transformation,
 *  or extracting specific information from the response.
 */

//Add a request interceptor to include JWT and CSRF Token. This is because in the backend jwt and csrf token are needed in some of the http request
api.interceptors.request.use(
  async (config) => {
    //get the JWT token value stored in the browser's local storage
    const token = localStorage.getItem("JWT_TOKEN");

    //creates an authorization header that include the keyword "Bearer " if token is present
    if (token) {
      //create authorization header starting with `Bearer `
      config.headers.Authorization = `Bearer ${token}`;
    }

    //get the csrf token value stored in the browser's localstorage
    let csrfToken = localStorage.getItem("CSRF_TOKEN");

    //check if csrfToken does not exist
    if (!csrfToken) {
      try {
        console.log(`${import.meta.env.VITE_REST_API_BASE_URL}/api/csrf-token`);
        //make a GET request to retrieve csrf token value from csrf token endpoint
        const response = await axios.get(
          `${import.meta.env.VITE_REST_API_BASE_URL}/api/csrf-token`,
          { withCredentials: true }
        );

        //store the csrf token in the csrfToken variable
        csrfToken = response.data.token;
        console.log("csrf token: " + csrfToken);
        //console.log("csrf token value :" + csrfToken);
        //set or store the return value(csrf token) from the axios GET request method which contains the csrf token in the browsers local storage
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        //throws exception if there is an error
        console.log("Failed to fetch CSRF TOKEN", error);
      }
    }

    //add the csrf token to the request header or set csrf token in the request header
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN "] = csrfToken;
    }

    //log csrf token in the console
    console.log("X-XSRF-TOKEN " + csrfToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
