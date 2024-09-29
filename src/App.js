import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Fixed import
import Login from './components/Login';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Render Login component on the root path */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes for receptionist and doctor dashboards */}
        <Route path="/receptionist" element={<PrivateRoute component={ReceptionistDashboard} />} />
        <Route path="/doctor" element={<PrivateRoute component={DoctorDashboard} />} />
      </Routes>
    </Router>
  );
}

const PrivateRoute = ({ component: Component }) => {
  const token = localStorage.getItem('token');
  
  // If token exists, render the component; otherwise, navigate to the login page
  if (!token) {
    return <Login />;
  }
  
  return <Component />;
};

export default App;
