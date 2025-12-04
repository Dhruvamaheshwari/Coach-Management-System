/** @format */

import React, { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


import "./LoginForm.css"




const LoginForm = ({ setIsloggin }) => {
  const nva = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e) {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    setIsloggin(true);
    nva("/home");
  }

  function handleBack()
  {
    nva(-1)
  }
   return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden  bg-white/90">

      {/* Soft glass effect layers */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl -z-10"></div>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm -z-20"></div>

      {/* Login Box */}
      <form
        className="w-[380px] bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 flex flex-col gap-5 animate-fadeIn"
        onSubmit={submitHandler}
      >
        {/* EMAIL FIELD */}
        <label className="flex flex-col gap-1">
          <p className="text-gray-700 font-semibold">
            Email Address <sup className="text-red-500">*</sup>
          </p>

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={changeHandler}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 transition"
            
          />
        </label>

        {/* PASSWORD FIELD */}
        <label className="flex flex-col gap-1 relative">
          <p className="text-gray-700 font-semibold">
            Password <sup className="text-red-500">*</sup>
          </p>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={formData.password}
            onChange={changeHandler}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[43px] cursor-pointer text-gray-600 hover:text-black"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>

          {/* Forgot Password */}
          <Link to="#" className="text-sm text-blue-600 hover:underline mt-1">
            Forgot Password?
          </Link>
        </label>

        {/* LOGIN BUTTON */}
        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                     font-semibold shadow-md transition">
          Log In
        </button>
         {/* Back BUTTON */}
        <button onClick={handleBack}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                     font-semibold shadow-md transition">
          Back 
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
