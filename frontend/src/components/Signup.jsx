import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePhoto: null,
    coverPhoto: null,
    gender: "",
    // Add more fields as needed
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone number validation: check if entered value is numeric
    if (name === "phoneNumber" && !/^\d+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: "Phone number must contain only numbers",
      });
    } else {
      setFormData({ ...formData, [name]: value });
      // Clear error message when user starts typing
      setErrors({ ...errors, [name]: "" });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );
      console.log(response.data); // Log the response for testing
      navigate("/"); // Navigate to login page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };
  const Submit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    // Check for email and password errors
    if (formData.email.length === 0) {
      newErrors.email = "Email is required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // If there are errors, set the state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Create user with email and password using Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.name,
        // Add more profile data as needed
      });

      console.log("User signed up:", user);

      navigate("/"); // Navigate to login page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };
  return (
    <form
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          className="input-field"
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="input-field"
          autoComplete="off"
          onChange={handleChange}
        />{" "}
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="input-field"
          autoComplete="off"
          onChange={handleChange}
        />{" "}
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          className="input-field"
          autoComplete="off"
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Profile Photo</label>
        <input
          type="file"
          name="profilePhoto"
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Cover Photo</label>
        <input
          type="file"
          name="coverPhoto"
          className="input-field"
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {" "}
          Languages Known
        </label>
        <select name="gender" className="input-field" onChange={handleChange}>
          <option value="">Select Languages Know</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
          <option value="Tamil">Tamil</option>
          <option value="other">other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Gender</label>
        <div className="flex items-center">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleChange}
          />
          <label htmlFor="male" className="ml-2 mr-4">
            Male
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleChange}
          />
          <label htmlFor="female" className="ml-2 mr-4">
            Female
          </label>
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={handleChange}
          />
          <label htmlFor="other" className="ml-2">
            Other
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
      <Link to="/">
        <button>Login</button>
      </Link>
    </form>
  );
};

export default SignupForm;
