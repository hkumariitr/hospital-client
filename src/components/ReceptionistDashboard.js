import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

const PatientModal = ({ patient, onClose, onSave, onDelete }) => {
  const [editedPatient, setEditedPatient] = useState(patient);

  const handleInputChange = (e) => {
    setEditedPatient({ ...editedPatient, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedPatient);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-semibold mb-4">{patient.name}</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              value={editedPatient.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              value={editedPatient.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              name="phone"
              value={editedPatient.phone}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="address"
              name="address"
              value={editedPatient.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-black rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save Changes
          </button>
          <button onClick={() => onDelete(patient.id)} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
  </div>
);

function ReceptionistDashboard() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '', address: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const patientsPerPage = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
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

  const handleInputChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('https://hospital-server-j4cu.onrender.com/api/patients', newPatient, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewPatient({ name: '', email: '', phone: '', address: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error adding new patient:', error);
      setIsLoading(false);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const handleSavePatient = async (editedPatient) => {
    setIsLoading(true);
    try {
      await axios.put(`https://hospital-server-j4cu.onrender.com/api/patients/${editedPatient.id}`, editedPatient, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPatients();
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error updating patient:', error);
      setIsLoading(false);
      // You might want to add some error handling here, e.g., showing an error message to the user
    }
  };

  const handleDeletePatient = async (patientId) => {
    setIsLoading(true);
    try {
      await axios.delete(`https://hospital-server-j4cu.onrender.com/api/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPatients();
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error deleting patient:', error);
      setIsLoading(false);
    }
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
            disabled={isLoading}
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500 disabled:bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <input
            name="email"
            value={newPatient.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            disabled={isLoading}
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500 disabled:bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <input
            name="phone"
            value={newPatient.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
            disabled={isLoading}
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500 disabled:bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <input
            name="address"
            value={newPatient.address}
            onChange={handleInputChange}
            placeholder="Address"
            disabled={isLoading}
            className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500 disabled:bg-gray-100"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-indigo-500 text-white py-2 px-4 rounded w-full hover:bg-indigo-600 disabled:bg-indigo-300"
        >
          {isLoading ? 'Adding...' : 'Add Patient'}
        </button>
      </form>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="space-y-4">
          {currentPatients.map(patient => (
            <li 
              key={patient.id} 
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
              onClick={() => handlePatientClick(patient)}
            >
              <p className="font-bold">{patient.name}</p>
              <p className="text-gray-600">{patient.email}</p>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={handleCloseModal}
          onSave={handleSavePatient}
          onDelete={handleDeletePatient}
        />
      )}
    </div>
  );
}

export default ReceptionistDashboard;