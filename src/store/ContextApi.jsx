/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

//create a context api instance
const ContextApi = createContext();

//create context provider component
export const ContextProvider = ({ children }) => {
  //retrieve token from the browser's localStorage
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? //convert jwt token value to json string if jwt token is present in the localStorage
      JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : //does nothing if no jwt token is present in the browser's local storage
      null;

  //find or retrieve the user status from the localstorage
  const isAdminStatus = localStorage.getItem("IS_ADMIN")
    ? //convert jwt token value to json string if jwt token is present in the localStorage
      JSON.stringify(localStorage.getItem("IS_ADMIN"))
    : false; //set status to false if not found

  //store the jwt token
  const [token, setToken] = useState(getToken);

  //store the current loggedIn user
  const [currentUser, setCurrentUser] = useState(null);

  //handle sidebar opening and closing in the admin panel
  const [openSidebar, setOpenSidebar] = useState(true);

  //check if the loggedIn user is admin or not
  const [isAdmin, setIsAdmin] = useState(isAdminStatus);

  // //fetch user function. the purpose of this function is to fetch the current user data from the api if the user is loggedIn
  const fetchUser = async () => {
    const userRoleKey = localStorage.getItem("USER_ROLE_KEY");
    //get the CURRENT user from the localstorage and convert it json object

    if (userRoleKey) {
      // Get the CURRENT user from the localstorage and convert it to json object
      const user = JSON.parse(localStorage.getItem(userRoleKey));

      if (user?.username) {
        try {
          //fetch the current user data from the endpoint /auth/user
          //and this contains data like roles,user status, all information about user credentials, account credentials etc.
          //NB this endpoint is yet to be created in the backend
          const { data } = await api.get(`/auth/user`);

          //get the roles part from the data
          const roles = data.roles;

          //check if the roles include the keyword ROLE_ADMIN or
          //Checks if the user has an admin role
          if (roles.includes("ROLE_ADMIN")) {
            //update the localstorage thus if the user is an admin:
            //stores "true" in localStorage under the key "IS_ADMIN"
            localStorage.setItem("IS_ADMIN", JSON.stringify(true));

            //update the admin state status to true
            setIsAdmin(true);
          } else {
            //removes IS_ADMIN key from the localstorage if roles does not include ROLE_ADMIN or the user is not admin
            localStorage.removeItem("IS_ADMIN");

            //update  the isAdmin state status to false
            setIsAdmin(false);
          }

          //Updates the currentUser state with the fetched user data from the endpoint "/auth/user"
          setCurrentUser(data);
        } catch (error) {
          //Logging the error to the console.
          console.error("Error fetching current user", error);

          //Displaying an error notification using toast.error
          toast.error("Error fetching current user");
        }
      }
    }
  };

  //useEffect function to fetch the current user if the jwt token exist
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  //through the context provider you are sending all the data(information about current loggedIn user) so that they can be accessed  anywhere in your application

  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        openSidebar,
        setOpenSidebar,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

//by using this (useMyContext) custom hook we can reach our context provider and access the datas across our components
export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
