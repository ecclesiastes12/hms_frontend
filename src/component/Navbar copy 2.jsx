/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../store/ContextApi";

// <Link />
// Purpose: Used for navigation between different routes/pages in a React app without causing a full page reload.
// When to Use:
// When you want to provide navigation options (e.g., a button, hyperlink) to move the user between different routes.
// To handle single-page application navigation efficiently.
// Example Use Case: Navigation menu, sidebars, or links within your app.
const Navbar = () => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // Access the states by using the useMyContext hook from the ContextProvider.
  //thus destructed state hook as props
  const { token, setToken, setCurrentUser, isAdmin, setIsAdmin } =
    useMyContext();

  //function that handles user logout
  const handleLogout = () => {
    //update the browser's localstorage to remove jwt token
    localStorage.removeItem("JWT_TOKEN");
    //update the browser's localstorage to remove user details
    localStorage.removeItem("NURSE");
    //update the browser's localstorage to remove csrf token
    localStorage.removeItem("CSRF_TOKEN");
    //update the browser's localstorage to remove isAdmin status
    localStorage.removeItem("IS_ADMIN");
    // localStorage.removeItem("USER_ROLE_KEY");
    // localStorage.removeItem("IS_ADMIN");

    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className='bg-orange-50'>
      <nav className='bg-white p-5 shadow flex items-center justify-between'>
        {/* Logo */}
        <div className='text-black'>
          <span className='flex items-center text-xl text-orange-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64'
              />
            </svg>
            Horizontal
          </span>
        </div>
        {/* Main menu */}
        <ul
          id='mainmenu'
          className={`text-black flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 absolute top-[70px] bg-white w-full md:static p-4 left-0 shadow md:shadow-none rounded-b-xl md:w-auto transition-all duration-300 ${
            toggleIcon || "md:opacity-100 md:pointer-events-auto"
          } ${
            toggleIcon
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <li className='group'>
            <a href='#' className='group-hover:text-orange-500'>
              Home
            </a>
          </li>
          {/* shows the create user and profile menu if user is authenticated */}
          {token && (
            <>
              <li className='group'>
                <Link to='/profile' className='group-hover:text-orange-500'>
                  Profile
                </Link>
              </li>
              {isAdmin && (
                <>
                  <li
                    className=' relative'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className='group-hover:text-orange-500 hover:text-orange-500 cursor-pointer'>
                      Users
                    </div>
                    <ul
                      className={`absolute top-full left-0 bg-red-200/20 shadow-lg rounded-lg px-2 mt-1 w-28 transition-all duration-300 ease-in-out transform outline outline-cyan-400 ${
                        isDropdownOpen
                          ? "opacity-100 visible translate-y-0 "
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <li className='group '>
                        <Link
                          to='/create-user'
                          className='group-hover:text-orange-500'
                        >
                          Create User
                        </Link>
                      </li>
                      <li className='group'>
                        <Link
                          to='/view-users'
                          className='group-hover:text-orange-500'
                        >
                          View User
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className='group'>
                    <Link
                      to='/view-patient'
                      className='group-hover:text-orange-500'
                    >
                      Opd
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          <li className='group'>
            <Link to='/about' className='group-hover:text-orange-500'>
              About
            </Link>
          </li>
          <li className='group'>
            <Link to='/contact' className='group-hover:text-orange-500'>
              Contact
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className='border border-orange-700 rounded px-2 md:py-0 w-full text-sm hover:text-orange-700 hover:bg-red-50 font-semibold cursor-pointer'
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className='border border-orange-700 rounded px-2 py-4 md:py-0 w-full text-sm md:justify-center hover:text-orange-700 hover:bg-red-50 font-semibold cursor-pointer'>
              <Link to='/signin'>
                <button>SignIn</button>
              </Link>
            </li>
          )}
        </ul>

        {/* Menu Icon */}
        <div
          className='md:hidden cursor-pointer'
          onClick={() => setToggleIcon(!toggleIcon)}
        >
          {toggleIcon ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6 text-orange-800'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
