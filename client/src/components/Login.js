import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './utils/Login.css'
import { toast } from 'sonner';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result=JSON.stringify({
      email:email,
      password:password
      });
      const response = await fetch("https://mentor-dashboard-api-three.vercel.app/",{method:'post',body:result,headers:{
        'Content-Type': 'application/json'
      }}).then(
      res=> res.json()
    ).then(
      data=>data
    );
      console.log(response.data)
      if (response.data.message !== 'Invalid email or password') {
        localStorage.setItem('mid', response.data.message);
        toast.success("Login successful")
        navigate('/dashboard');
      } else {
        // alert('Invalid email or password');
        toast.error("Invalid email or password")
      }
      
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while logging in');
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>

      </div>
      {/* <Toaster richColors /> */}

    </>
  );
};

export default Login;
