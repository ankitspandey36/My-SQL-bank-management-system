import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBranch = () => {
  const [formData, setFormData] = useState({
    BranchID: '',
    BranchName: '',
    Location: '',
    Phone: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5010/api/v1/branches/create',
        formData
      );
      alert(response.data.message);
      setErrorMessage('');
      setFormData({ BranchID: '', BranchName: '', Location: '', Phone: '' });
      navigate('/admindashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error adding branch';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Add New Branch</h1>
          <p className="text-gray-600">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {['BranchID', 'BranchName', 'Location', 'Phone'].map((field, i) => (
            <div key={i}>
              <label className="text-sm font-medium text-gray-700">
                {field}
              </label>
              <input
                type={field === 'BranchID' ? 'number' : field === 'Phone' ? 'tel' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={
                  field === 'BranchID'
                    ? 'e.g., 101'
                    : field === 'BranchName'
                    ? 'e.g., Bhagalpur Main Branch'
                    : field === 'Location'
                    ? 'e.g., Main Road, Adampur'
                    : 'e.g., 9876543210'
                }
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? 'Adding...' : 'Add Branch'}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBranch;
