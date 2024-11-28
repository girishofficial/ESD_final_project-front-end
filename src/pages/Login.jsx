
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { saveTokenToLocalStorage } from "../utils/tokenUtil";
import { getTokenFromLocalStorage } from "../utils/tokenUtil";
import LoginForm from "../Components/LoginForm";

 function Login({ onLoginSuccess }) {
  
  
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async ({ email, password }) => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/auth/login", {
          email,
          password,
        });
  
        const token = response.data;
  
        if (!token) {
          setError("Login failed. Please try again.");
          return;
        }
  
        saveTokenToLocalStorage(token);
        onLoginSuccess(token);
        navigate("/dashboard");
      } catch (err) {
        setError("Invalid credentials, please try again.");
      }
    };
  
    useEffect(() => {
      const token = getTokenFromLocalStorage();
      if (token) {
        navigate("/dashboard");
      }
    }, [navigate]);
  
    return (
      <div className="main d-flex justify-content-center align-items-center min-vh-100">
        <div className="container d-flex justify-content-center align-items-center">
          <LoginForm onLogin={handleLogin} error={error} />
        </div>
      </div>
    );
  };
 
  export default Login;
