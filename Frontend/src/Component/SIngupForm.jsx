import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignupForm = ({ setIsloggin }) => {
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  // Renamed to department and initialized with a default empty value or the first option
  const [department, setDepartment] = useState("");

  const [formdata, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword:"",
    // Added role to the form data
    role: "",
  });

  function changeHandler(e) {
    // Update both formdata and the local department state if the department select changes
    if (e.target.name === "role") {
      setDepartment(e.target.value);
    }

    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  // function submitHandler(e) {
  //   e.preventDefault();
  //   // For demonstration, logging the form data:
  //   console.log("Signup Data Submitted:", formdata);
  //   // Placeholder: Successful signup redirects
  //   setIsloggin(true);
  //   nav("/dashbord");
  // }
  async function submitHandler(e) {
    e.preventDefault();


    // check the password and conformpassword match or not
    if (formdata.password !== formdata.confirmPassword) {
      alert("password is not correct");
      return;
    }

    // send data to backend;
    try {
      const res = await fetch("http://localhost:4000/api/v1/singup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ye isliye jisse cookie browser pr dikhe
        body: JSON.stringify(formdata), // send the all formdata to backend;
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");
    setIsloggin(true);
    nav("/home");

    } catch (err) {
      console.error("Signup Error:", err);
    }

  }

  function handleBack() {
    nav(-1);
  }

  return (
    <div className="w-full flex flex-col gap-5 animate-fadeIn ">

      {/* ⭐ Department Select Dropdown (New Element) */}
      <label className="flex flex-col gap-1">
        <p className="text-gray-700 font-semibold">
          Department/Role <sup className="text-red-500">*</sup>
        </p>

        <select
          name="role"
          required
          value={formdata.role}
          onChange={changeHandler}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            bg-white/70 focus:ring-2 focus:ring-indigo-500 appearance-none"
        >
          <option value="" disabled>
            Select your Department/Role
          </option>
          {/* Your new options */}
          <option value="admin">Admin</option>
          <option value="mechanical">Mechanical</option>
          <option value="electrical">Electrical</option>
          <option value="signal_telecom">Signal & Telecom</option>
          <option value="carriage_wagon">Carriage & Wagon</option>
          <option value="traction">Traction</option>
          <option value="operations">Operations</option>
          <option value="engineering">Engineering</option>
          <option value="railway_safety">Railway Safety</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </label>

      {/* ⭐ FORM START */}
      <form onSubmit={submitHandler} className="flex flex-col gap-5">

        {/* First & Last Name */}
        <div className="flex gap-4">
          <label className="w-1/2 flex flex-col gap-1">
            <p className="text-gray-700 font-semibold">
              First Name <sup className="text-red-500">*</sup>
            </p>

            <input
              type="text"
              name="first_name"
              required
              value={formdata.first_name}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              bg-white/70 focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="w-1/2 flex flex-col gap-1">
            <p className="text-gray-700 font-semibold">
              Last Name <sup className="text-red-500">*</sup>
            </p>

            <input
              type="text"
              name="last_name"
              required
              value={formdata.last_name}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              bg-white/70 focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        </div>

        {/* Email */}
        <label className="flex flex-col gap-1">
          <p className="text-gray-700 font-semibold">
            Email <sup className="text-red-500">*</sup>
          </p>

          <input
            type="email"
            name="email"
            required
            value={formdata.email}
            onChange={changeHandler}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            bg-white/70 focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Password */}
        <label className="flex flex-col gap-1 relative">
          <p className="text-gray-700 font-semibold">
            Password <sup className="text-red-500">*</sup>
          </p>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={formdata.password}
            onChange={changeHandler}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            bg-white/70 focus:ring-2 focus:ring-indigo-500"
          />

          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[45px] cursor-pointer text-gray-600"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </label>

        {/* Confirm Password */}
        <label className="flex flex-col gap-1 relative">
          <p className="text-gray-700 font-semibold">
            Confirm Password <sup className="text-red-500">*</sup>
          </p>

          <input
            type={showConPassword ? "text" : "password"}
            name="confirmPassword"
            required
            value={formdata.confirmPassword}
            onChange={changeHandler}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            bg-white/70 focus:ring-2 focus:ring-indigo-500"
          />

          <span
            onClick={() => setShowConPassword((prev) => !prev)}
            className="absolute right-3 top-[45px] cursor-pointer text-gray-600"
          >
            {showConPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </label>

        {/* Submit Button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg 
          font-semibold shadow-md transition">
          Create Account
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="w-full bg-gray-700 hover:bg-black text-white py-3 rounded-lg 
          font-semibold shadow-md transition"
        >
          Back
        </button>

      </form>
    </div>
  );
};

export default SignupForm;