import React from 'react'
import '../styles/dashboard.css'

const Dashboard = () => {
 
    // Get username from localStorage
  const username = localStorage.getItem('username');
  return (
    <div>
        
      <h1>Welcome to {username ? username : 'User'} </h1>
    </div>
  );
}

export default Dashboard
