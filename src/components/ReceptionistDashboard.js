import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function ReceptionistDashboard() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '', address: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const response = await axios.get('https://hospital-server-j4cu.onrender.com/api/patients', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setPatients(response.data);
  };

  const handleInputChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://hospital-server-j4cu.onrender.com/api/patients', newPatient, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNewPatient({ name: '', email: '', phone: '', address: '' });
    fetchPatients();
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Receptionist Dashboard</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">Add New Patient</h3>
        <div className="mb-4">
          <input
            name="name"
            value={newPatient.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="email"
            value={newPatient.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="phone"
            value={newPatient.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            name="address"
            value={newPatient.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded w-full hover:bg-indigo-600">
          Add Patient
        </button>
      </form>
      <ul className="space-y-4">
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
  );
}

export default ReceptionistDashboard;
