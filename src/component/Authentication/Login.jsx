import image from "../../images/loginBackgroundImg.jpg";
import SvgIconLoader from "../SvgIconLoader";

import "../../index.css";
import api from "../../services/api";
import { React, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMyContext } from "../../store/ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  // const defaultApi = createApiInstance();
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [icons, setIcons] = useState({}); // Store loaded icons

  //Access the token and setToken function using the useMyContext hook from the ContextProvider
  const { setToken, token } = useMyContext();
  const navigate = useNavigate();

  //install react-hook-form before you can use useForm hook below
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      code: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    const loadIcons = async () => {
      const iconNames = [
        "user",
        "password",
        "facebook",
        "google",
        "linkedin",
        "github",
        "twitter",
      ];
      const loadedIcons = {};

      for (const name of iconNames) {
        try {
          const iconModule = await import(
            `../../assets/icons/${name}.svg?react`
          );
          loadedIcons[name] = iconModule.default;
        } catch (error) {
          console.error(`Failed to load icon ${name}:`, error);
        }
      }

      setIcons(loadedIcons);
    };

    loadIcons();
  }, []);
  //function that handle successful login
  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };

    console.log("user role name: " + decodedToken.roles.split(", "));
    //Dynamically set user's primary role
    let userRoleKey = user.roles.join(", "); //Default key if no specific role is found
    if (user.roles.includes("ROLE_DOCTOR")) {
      userRoleKey = "DOCTOR";
    } else if (user.roles.includes("ROLE_HR")) {
      userRoleKey = "HR";
    } else if (user.roles.includes("ROLE_NURSE")) {
      userRoleKey = "NURSE";
    } else if (user.roles.includes("ROLE_PHAMACIST")) {
      userRoleKey = "PHAMACIST";
    } else if (user.roles.includes("ROLE_BILL_STAFF")) {
      userRoleKey = "BILL_STAFF";
    } else if (user.roles.includes("ROLE_RECEPTIONIST")) {
      userRoleKey = "RECEPTIONIST";
    } else if (user.roles.includes("ROLE_ADMIN")) {
      userRoleKey = "ADMIN";
    }

    //Always set USER_ROLE in the localstorage
    // if (user.roles.length > 0) {
    //   localStorage.setItem("USER_ROLE", user.roles[]);
    // } else {
    //   localStorage.removeItem("USER_ROLE");
    // }

    localStorage.setItem("JWT_TOKEN", token);
    // localStorage.setItem("DOCTOR", JSON.stringify(user));
    localStorage.setItem(userRoleKey, JSON.stringify(user));
    localStorage.setItem("USER_ROLE_KEY", userRoleKey);

    // if (user.roles.includes("ROLE_ADMIN")) {
    //   localStorage.setItem("IS_ADMIN", "true");
    // } else {
    //   localStorage.setItem("USER_ROLE", user.roles[0]);
    // }

    setToken(token);

    navigate("/users");
  };

  //function to handle login with credentials
  const onLoginHandler = async (data) => {
    try {
      setLoading(false);
      const response = await api.post("/auth/public/signin", data);

      //toast message after successful login
      toast.success("Login Successful");

      //reset the input field by using reset() function provided by react hook form after submission
      reset();

      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);

        //NB install jwt-decode from npm to enable you to use jwtDecode method
        const decodedToken = jwtDecode(response.data.jwtToken);
        console.log(decodedToken);
        handleSuccessfulLogin(response.data.jwtToken, decodedToken);
      }
    } catch (error) {
      if (error) {
        toast.error("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  //if there is token  exist navigate  the user to the home page if he tried to access the login page
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className='min-h-screen bg-cover flex justify-center items-center'
    >
      <div className='w-[400px] border border-red-500 rounded-lg bg-gradient-to-tr from-red-300/40 to-white/20 p-7 backdrop-blur-sm '>
        <h3 className='text-center text-red-800 text-3xl font-bold mb-2'>
          Login
        </h3>
        <p className='text-center font-semibold text-white bg-red-300 rounded-sm'>
          Please enter your username and password
        </p>
        <form
          onSubmit={handleSubmit(onLoginHandler)}
          className='flex flex-col my-5 space-y-7 '
        >
          <div className='-mt-1'>
            <label className='text-white'>Username</label>
            <div className='flex items-center rounded-xl border bg-red-400/40 border-red-400/40 backdrop-blur-sm p-1'>
              <input
                {...register("username", { required: "Username is required" })}
                type='text'
                className='w-full text-white p-2 border-0 outline-0 focus:placeholder-transparent placeholder:text-gray-300 focus:placeholder:duration-500 peer'
                placeholder='Type your username'
              />
              {icons.user && (
                <icons.user className='size-6 right-2 text-gray-300  peer-focus:text-gray-600 duration-500' />
              )}
            </div>
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div>
            <label className='text-white'>Password</label>
            <div className='flex items-center rounded-xl border bg-red-400/40 border-red-400/40 backdrop-blur-sm p-1'>
              <input
                {...register("password", { required: "password is required" })}
                type='text'
                className='w-full text-white p-2 border-0 outline-0 focus:placeholder-transparent placeholder:text-gray-300 focus:placeholder:duration-500 peer'
                placeholder='Type your password'
              />
              {icons.password && (
                <icons.password className='size-6 right-2 text-gray-300  peer-focus:text-gray-600 duration-500' />
              )}
            </div>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button className='bg-red-600/80 text-white hover:bg-red-700 py-2 rounded-lg focus:outline-none cursor-pointer'>
            Sign In
          </button>

          <div className='flex items-center'>
            <div className='flex-grow border-t border-gray-500'></div>
            OR
            <div className='flex-grow border-t border-gray-500'></div>
          </div>
          <div className='flex justify-center space-x-5 mt-2 mb-3'>
            {/* {["facebook", "google", "twitter", "github", "linkedin"].map(
              (icon) =>
                icons[icon] && (
                  <a href='#' key={icon}>
                    {React.createElement(icons[icon], {
                      className:
                        "size-12 p-1 text-gray-300 border border-red-400 rounded-lg hover:bg-red-100 bg-white",
                    })}
                  </a>
                )
            )} */}

            <a href='#'>
              {icons.facebook && (
                <icons.facebook className='size-12 p-1 text-gray-300 border  border-red-400 rounded-lg hover:bg-red-100 bg-white' />
              )}
            </a>
            <a href='#'>
              {icons.google && (
                <icons.google className='size-12 p-1 text-gray-300 border  border-red-400 rounded-lg hover:bg-red-100 bg-white' />
              )}
            </a>
            <a href='#'>
              {icons.twitter && (
                <icons.twitter className='size-12 p-1 text-gray-300 border  border-red-400 rounded-lg hover:bg-red-100 bg-white' />
              )}
            </a>
            <a href='#'>
              {icons.github && (
                <icons.github className='size-12 p-1 text-gray-300 border  border-red-400 rounded-lg hover:bg-red-100 bg-white' />
              )}
            </a>
            <a href='#'>
              {icons.linkedin && (
                <icons.linkedin className='size-12 p-1 text-gray-300 border  border-red-400 rounded-lg hover:bg-red-100 bg-white' />
              )}
            </a>
          </div>
        </form>

        <div className='text-center  text-white'>
          Don't have an account?{" "}
          <Link
            to='/signup'
            className='bg-red-400 rounded px-3 py-2 ml-2 hover:text-red-700 duration-1000'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
