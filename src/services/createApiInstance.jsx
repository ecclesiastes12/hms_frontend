// import axios from "axios";

// const getBaseUrl = (serviceType) => {
//   switch (serviceType) {
//     case "patient":
//       return import.meta.env.VITE_PATIENT_REST_API_BASE_URL;
//     case "doctor":
//       return import.meta.env.VITE_DOCTOR_REST_API_BASE_URL;
//     case "nurse":
//       return import.meta.env.VITE_NURSE_REST_API_BASE_URL;
//     default:
//       return import.meta.env.VITE_REST_API_BASE_URL;
//   }
// };

// const createApiInstance = (serviceType = "default") => {
//   const baseURL = `${getBaseUrl(serviceType)}/api`;

//   const apiInstance = axios.create({
//     baseURL,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     withCredentials: true,
//   });

//   // Request Interceptor
//   apiInstance.interceptors.request.use(
//     async (config) => {
//       const token = localStorage.getItem("JWT_TOKEN");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       let csrfToken = localStorage.getItem("CSRF_TOKEN");

//       if (!csrfToken) {
//         try {
//           const response = await axios.get(`${baseURL}/csrf-token`, {
//             withCredentials: true,
//           });

//           csrfToken = response.data.token;
//           localStorage.setItem("CSRF_TOKEN", csrfToken);
//         } catch (error) {
//           console.error("Failed to fetch CSRF TOKEN", error);
//         }
//       }

//       if (csrfToken) {
//         config.headers["X-XSRF-TOKEN"] = csrfToken;
//       }

//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return apiInstance;
// };

// export default createApiInstance;
