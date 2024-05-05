// LoginForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
const LoginForm = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [value, setValue] = useState("");
  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password,
        profilePhoto,
        coverPhoto,
      };

      const response = await axios.post("http://localhost:3001/", userData);

      if (response.data.message === "Success") {
        setUserData(response.data.userData); // Set user data after successful login
        navigate(`/home`);
      } else {
        console.error("Error logging in:", response.data);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem("email", data.user.email);
      setLoggedInWithGoogle(true); // Set state to true after successful Google login
      navigate("/home"); // Navigate to home after successful Google login
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Photo:
          </label>
          <input
            type="file"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="coverPhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Photo:
          </label>
          <input
            type="file"
            onChange={(e) => setCoverPhoto(e.target.files[0])}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Login
        </button>
      </form>
      <p>Already have an Account</p>
      <Link to="/register">
        <button>Register</button>
      </Link>{" "}
      {!loggedInWithGoogle && (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default LoginForm;
