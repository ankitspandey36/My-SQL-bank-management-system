import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const DeleteBranch = () => {
  const [branchID, setBranchID] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!branchID) return alert("Branch ID is required!");

    const confirmDelete = window.confirm(`Are you sure you want to delete branch ${branchID}? This is irreversible.`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await axios.delete(`https://my-sql-bank-management-system-01.onrender.com/api/v1/branches/delete/${branchID}`);
      alert(response.data.message);
      setBranchID('');
      navigate('/admindashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting branch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiTrash2 className="mx-auto text-4xl text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Delete Branch</h1>
          <p className="text-gray-500">Enter the ID to permanently delete a branch.</p>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            <strong>Warning:</strong> This action is irreversible. Deleting a branch may affect associated employees.
          </p>
        </div>

        <form onSubmit={handleDelete} className="space-y-6">
          <div>
            <label htmlFor="BranchID" className="text-sm font-medium text-gray-700">Branch ID</label>
            <input
              type="number"
              id="BranchID"
              value={branchID}
              onChange={(e) => setBranchID(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter Branch ID (e.g., 101)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300"
          >
            {loading ? 'Deleting...' : 'Delete Branch'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteBranch;
