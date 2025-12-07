import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from 'axios'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !email && !password) {
      setError("All fields required!");
      return;
    }
    if (!username) {
      setError("username required!");
      return;
    }
    if (!email) {
      setError("email required!");
      return;
    }
    if (!password) {
      setError("password required!");
      return;
    }
    setSubmitting(true);
   
   
    try {
       const res = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        username,
        password
      }, {
        withCredentials: true
      });

     console.log(res);
      setError("");
      alert("Account created!");
      navigate("/");
    } catch (err) { 
      console.error(err);
      setError("Registration failed! " + (err.response?.data?.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submit" disabled={submitting}>Register</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
