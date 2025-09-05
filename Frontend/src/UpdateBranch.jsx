import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

const UpdateBranch = () => {
  const [branchID, setBranchID] = useState('');
  const [formData, setFormData] = useState({
    BranchName: '',
    Location: '',
    Phone: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!branchID) return alert("Branch ID is required!");
    
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5010/api/v1/branches/update/${branchID}`, formData);
      alert(response.data.message);
      setBranchID('');
      setFormData({ BranchName: '', Location: '', Phone: '' });
      navigate('/admindashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating branch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiEdit className="mx-auto text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Update Branch</h1>
          <p className="text-gray-500">Enter the Branch ID and the new details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="BranchID" className="text-sm font-medium text-gray-700">Branch ID to Update</label>
            <input
              type="number"
              id="BranchID"
              value={branchID}
              onChange={(e) => setBranchID(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Branch ID"
            />
          </div>

          <div>
            <label htmlFor="BranchName" className="text-sm font-medium text-gray-700">New Branch Name</label>
            <input
              type="text"
              id="BranchName"
              name="BranchName"
              value={formData.BranchName}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="Optional: New name"
            />
          </div>

          <div>
            <label htmlFor="Location" className="text-sm font-medium text-gray-700">New Location</label>
            <input
              type="text"
              id="Location"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="Optional: New location"
            />
          </div>
          
          <div>
            <label htmlFor="Phone" className="text-sm font-medium text-gray-700">New Phone Number</label>
            <input
              type="tel"
              id="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="Optional: New phone"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Updating...' : 'Update Branch'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBranch;