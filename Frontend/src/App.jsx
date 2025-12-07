
import Login from "./components/Login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import { Routes, Route } from "react-router-dom";
import './App.css'


function App() {
  return (
  
  
  
  <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App
