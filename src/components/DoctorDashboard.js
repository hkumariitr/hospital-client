import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const patientsPerPage = 5;

  useEffect(() => {
    fetchPatients();
    fetchStats();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://hospital-server-j4cu.onrender.com/api/patients', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('https://hospital-server-j4cu.onrender.com/api/patient_stats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Map full weekday names to shortened names
      const weekdayMap = {
        'Monday': 'Mon',
        'Tuesday': 'Tue',
        'Wednesday': 'Wed',
        'Thursday': 'Thu',
        'Friday': 'Fri',
        'Saturday': 'Sat',
        'Sunday': 'Sun'
      };

      // Define the order of weekdays starting from Mon
      const weekdayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      // Map and sort stats by the defined weekday order, using shortened names
      const statsByWeekday = Object.entries(response.data)
        .map(([weekday, count]) => ({ weekday: weekdayMap[weekday], count }))
        .sort((a, b) => weekdayOrder.indexOf(a.weekday) - weekdayOrder.indexOf(b.weekday));

      setStats(statsByWeekday);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-6">Doctor Dashboard</h2>
        <h3 className="text-2xl mb-4">Patient Registration Statistics</h3>
        <div className="flex-grow">
          {stats.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats}>
                <XAxis dataKey="weekday" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No statistics available</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6 flex flex-col">
        <h3 className="text-2xl mb-4">Registered Patients</h3>
        {patients.length > 0 ? (
          <div className="flex-grow flex flex-col">
            <ul className="flex-grow space-y-4 overflow-y-auto">
              {currentPatients.map(patient => (
                <li key={patient.id} className="bg-white p-4 rounded shadow">
                  <p className="font-bold">{patient.name}</p>
                  <p className="text-gray-600">{patient.email}</p>
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <p>No patients registered</p>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
