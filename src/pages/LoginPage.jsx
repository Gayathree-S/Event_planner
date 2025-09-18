import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }
    // Authentication logic (for demo use localStorage "users")
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!foundUser) {
      toast.error("Invalid email or password");
      return;
    }

    // Save logged-in user to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    toast.success("Successfully logged in!");
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="container">
      <div className="login-card">
        <h3 className="title">Login to Your Account</h3>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            autoFocus
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit" className="btn">
            Sign In
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2500} />
      <style>{`
        .container {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f8f9fa;
          padding: 20px;
          box-sizing: border-box;
        }
        .login-card {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          max-width: 380px;
          width: 100%;
          box-sizing: border-box;
        }
        .title {
          margin-bottom: 25px;
          text-align: center;
          font-weight: 600;
          font-size: 1.5rem;
          color: #212529;
        }
        .label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #495057;
          font-size: 0.9rem;
        }
        .input {
          width: 100%;
          padding: 10px 14px;
          margin-bottom: 20px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input:focus {
          border-color: #007BFF;
          box-shadow: 0 0 5px rgba(0,123,255,0.5);
        }
        .btn {
          width: 100%;
          padding: 12px 0;
          font-size: 1.1rem;
          font-weight: 600;
          background-color: #007BFF;
          border: none;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #0056b3;
        }
        @media (max-width: 400px) {
          .login-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
