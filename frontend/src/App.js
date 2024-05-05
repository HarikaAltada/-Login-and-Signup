// Frontend - React App
import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/Signup";
import LoginForm from "./components/Login";
import Home from "./components/Home";
const App = () => {
  const [userData, setUserData] = useState(null);
  return (
    <Router>
      <div className="App">
        <Routes>
          {" "}
          <Route path="/home" element={<Home userData={userData} />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/" element={<LoginForm setUserData={setUserData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
