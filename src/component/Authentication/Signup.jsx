import React, { useState } from "react";
import { useForm } from "react-hook-form";

import SignUpImage from "../../images/signupBackgroundImg.jpg";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <div
      style={{ backgroundImage: `URL(${SignUpImage})` }}
      className='min-h-[cal(100vh) - 70px] bg-cover flex justify-center items-center'
    >
      <section className='min-w-[400px] border border-red-500 rounded-lg mt-5 mb-5 bg-gradient-to-tr from-red-300/40 to-white/20 p-7 backdrop-blur-sm'>
        <h3 className='text-center text-red-800 text-3xl font-bold mb-2'>
          SignUp
        </h3>

        <form className='flex flex-col my-5 space-y-7 '>
          <div className='-mt-1'>
            <label className='text-white'>Username</label>
            <div className='flex items-center rounded-xl border bg-red-400/40 border-red-400/40 backdrop-blur-sm p-1'>
              <input
                {...register("username", { required: "Username is required" })}
                type='text'
                className='w-full text-white p-2 border-0 outline-0 focus:placeholder-transparent placeholder:text-gray-300 focus:placeholder:duration-500 peer'
                placeholder='Type your username'
              />
            </div>
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div>
            <label className='text-white'>Email</label>
            <div className='flex items-center rounded-xl border bg-red-400/40 border-red-400/40 backdrop-blur-sm p-1'>
              <input
                {...register("email", { required: "email is required" })}
                type='text'
                className='w-full text-white p-2 border-0 outline-0 focus:placeholder-transparent placeholder:text-gray-300 focus:placeholder:duration-500 peer'
                placeholder='Type your email'
              />
            </div>
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
            </div>
          </div>
          <button className='bg-red-600/80 text-white hover:bg-red-700 py-2 rounded-lg focus:outline-none cursor-pointer'>
            Save
          </button>
        </form>
      </section>
    </div>
  );
};

export default Signup;
