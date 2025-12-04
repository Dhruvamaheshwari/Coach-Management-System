import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignupForm = ({ setIsloggin }) => {

  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  // ⭐ Add account type state
  const [accountType, setAccountType] = useState("student");

  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  function changeHandler(e) {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value
    }));
  }

  function sumbmitHandler(e) {
    e.preventDefault();
    setIsloggin(true);
    nav('/dashbord');
  }
    function handleBack()
  {
    nav(-1)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center  
     relative overflow-hidden">

      {/* Glass BG */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl -z-10"></div>

      <div className="w-[420px]  backdrop-blur-xl rounded-xl shadow-2xl p-8 animate-fadeIn">

        {/* ⭐ FIXED ROLE SELECTION */}
        <div className="flex w-full mb-6 border rounded-lg overflow-hidden">

          <button
            type="button"
            onClick={() => setAccountType("student")}
            className={`w-1/2 py-3 font-semibold transition 
              ${accountType === "student"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setAccountType("instructor")}
            className={`w-1/2 py-3 font-semibold transition 
              ${accountType === "instructor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Instructor
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={sumbmitHandler} className="flex flex-col gap-4">

          <div className="flex gap-4">
            <label className="w-1/2 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">
                First Name <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                required
                value={formdata.firstName}
                name="firstName"
                onChange={changeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="w-1/2 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">
                Last Name <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                required
                value={formdata.lastName}
                name="lastName"
                onChange={changeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <p className="text-gray-700 font-semibold">
              Email <sup className="text-red-500">*</sup>
            </p>
            <input
              type="email"
              required
              value={formdata.email}
              name="email"
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 relative">
            <p className="text-gray-700 font-semibold">
              Enter Password <sup className="text-red-500">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formdata.password}
              name="password"
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-[43px] cursor-pointer text-gray-600"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </label>

          <label className="flex flex-col gap-1 relative">
            <p className="text-gray-700 font-semibold">
              Confirm Password <sup className="text-red-500">*</sup>
            </p>
            <input
              type={showConPassword ? "text" : "password"}
              required
              value={formdata.confirmPassword}
              name="confirmPassword"
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowConPassword(prev => !prev)}
              className="absolute right-3 top-[43px] cursor-pointer text-gray-600"
            >
              {showConPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </label>

          <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition">
            Create Account
          </button>
          {/* Back BUTTON */}
          <button onClick={handleBack}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                     font-semibold shadow-md transition">
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
