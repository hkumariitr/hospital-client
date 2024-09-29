import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      Navigate(response.data.role === 'receptionist' ? '/receptionist' : '/doctor');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = () => {
    Navigate('/register'); // Assumes you have a registration route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          className="mb-6 p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
        />
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded w-full hover:bg-indigo-600">
          Login
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Not registered? </span>
          <button 
            type="button" 
            onClick={handleRegister} 
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
