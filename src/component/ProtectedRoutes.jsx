//NB the children in the parameter represent the component that will be rendered if authenticated. adminPage indicates if the route is for admin page or not

import { Navigate, useNavigate } from "react-router-dom";
import { useMyContext } from "../store/ContextApi";

const ProtectedRoutes = ({ children, adminPage }) => {
  const { token, isAdmin } = useMyContext();
  const navigate = useNavigate();

  //navigate to the login page for unauthenticated user
  if (!token) {
    return <Navigate to='/login' replace />;
  }

  //navigate to access-denied page if a user try to access the admin page
  if (token && adminPage && !isAdmin) {
    return <Navigate to='/access-denied' replace />;
  }

  return children;
};

export default ProtectedRoutes;
