import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(user => user.email === email)) {
      toast.error("Email already registered");
      return;
    }
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="container">
      <h3 className="title">Create an Account</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
        <label htmlFor="username" className="label">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="input"
        />
        <label htmlFor="email" className="label">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input"
        />
        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input"
        />
        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <ToastContainer position="top-center" autoClose={2500} />
      <style>{`
        .container {
          height: 100vh;
          width: 100vw;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }
        form {
          max-width: 400px;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .title {
          margin-bottom: 24px;
          font-size: 1.5rem;
          font-weight: 600;
          color: #212529;
          text-align: center;
        }
        .label {
          margin-bottom: 8px;
          color: #495057;
          font-weight: 500;
          font-size: 0.9rem;
        }
        .input {
          padding: 12px 14px;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ced4da;
          margin-bottom: 20px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input:focus {
          border-color: #007BFF;
          box-shadow: 0 0 5px rgba(0,123,255,0.5);
        }
        .btn {
          padding: 14px 0;
          font-size: 1.15rem;
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
      `}</style>
    </div>
  );
}

export default SignUpPage;
