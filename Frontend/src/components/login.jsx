import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      setError("All credentials required!");
      return;
    }
    if (!email) {
      setError("Email required or wrong email!");
      return;
    }
    if (!password) {
      setError("Password required or wrong password!");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post("https://assigment-05mu.onrender.com/login", {
        email,
        password
      }, {
        withCredentials: true
      });
      console.log(res);
      // Save username to localStorage
      if (res.data && res.data.user && res.data.user.username) {
        localStorage.setItem("username", res.data.user.username);
      }
      setError("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      // If credentials are wrong, show a specific message
      if (err.response?.status === 401) {
        setError("Wrong credentials!");
      } else {
        setError("Login failed! " + (err.response?.data?.message || ""));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={submitting}>Login</button>

        <p>
          Don't have an account? <Link to="/register"><span className="register">Register</span></Link>
        </p>
      </form>
    </div>
  );
}
