import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiHome } from 'react-icons/fi';

const ShowBranch = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://my-sql-bank-management-system-01.onrender.com/api/v1/branches/getall');
        setBranches(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching branches');
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <FiHome className="text-3xl text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Branch Directory</h1>
            <p className="text-gray-500">A list of all active branches.</p>
          </div>
        </div>

        {loading ? (
          <p className="text-center p-6">Loading...</p>
        ) : error ? (
          <p className="text-center p-6 text-red-500">{error}</p>
        ) : branches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div key={branch.BranchID} className="bg-white p-6 rounded-xl shadow-lg border">
                <h3 className="text-lg font-bold text-blue-700">{branch.BranchName}</h3>
                <p className="text-sm text-gray-500 mb-4">Branch ID: {branch.BranchID}</p>
                <div className="space-y-1 text-gray-700 text-sm">
                  <p><strong>Location:</strong> {branch.Location}</p>
                  <p><strong>Phone:</strong> {branch.Phone}</p>
                  <p><strong>Total Employees:</strong> {branch.TotalEmployees}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow">
            <p className="text-gray-500">No branches found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBranch;
