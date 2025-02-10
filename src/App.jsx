import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Authentication/Login";
import Signup from "./component/Authentication/Signup";
import Navbar from "./component/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./component/Footer";
import LandingPage from "./component/LandingPage";
import AllUsers from "./component/Authentication/Signup";
import ProtectedRoutes from "./component/ProtectedRoutes";
import ViewPatient from "./component/opd/ViewPatient";
import UserForm from "./component/Users/UserForm";
import ListUsers from "./component/Users/ListUsers";

function App() {
  return (
    <Router>
      <Navbar />
      {/* reverseOrder={false} means that each new toast will be added to the bottom
      of the list. If you change it to true, the new toasts will appear at the
      top */}
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        {/* unprotected route */}
        {/* path='/login' the value of the path attribute is map to a particular component. thus if the user visit '/login' the <Login/> component should be rendered */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* protected routes */}
        <Route path='/users' element={<AllUsers />}></Route>
        <Route
          path='/view-patient'
          element={
            <ProtectedRoutes>
              <ViewPatient />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path='/create-user'
          element={
            <ProtectedRoutes>
              <UserForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/view-users'
          element={
            <ProtectedRoutes>
              <ListUsers />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
