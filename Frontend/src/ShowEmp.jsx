import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FiSearch, FiUsers } from 'react-icons/fi';

const ShowEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('all');
  const { register, handleSubmit } = useForm();

  const fetchAllEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://my-sql-bank-management-system-01.onrender.com/api/v1/employees/getall');
      setEmployees(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching employees.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const onSubmit = async (data) => {
    if (data.searchType === 'all') {
      fetchAllEmployees();
      return;
    }

    if (!data.searchValue) {
      setError('Please enter a search value.');
      return;
    }

    let url = '';
    if (data.searchType === 'employee') {
      url = `https://my-sql-bank-management-system-01.onrender.com/api/v1/employees/getbyeid/${data.searchValue}`;
    } else if (data.searchType === 'branch') {
      url = `https://my-sql-bank-management-system-01.onrender.com/api/v1/employees/getbybid/${data.searchValue}`;
    }

    setLoading(true);
    try {
      const response = await axios.get(url);
      setEmployees(Array.isArray(response.data.data) ? response.data.data : [response.data.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'No records found.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <FiUsers className="text-3xl text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Employee Records</h1>
              <p className="text-gray-500">Search for employees by ID, branch, or view all records.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 mt-4">
            <select
              {...register('searchType')}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">All Employees</option>
              <option value="employee">By Employee ID</option>
              <option value="branch">By Branch ID</option>
            </select>

            <input
              type="text"
              {...register('searchValue')}
              placeholder={searchType === 'all' ? 'Not needed' : 'Enter ID...'}
              disabled={searchType === 'all'}
              className="p-3 border border-gray-300 rounded-lg flex-grow disabled:bg-gray-200"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              <FiSearch className="mr-2" />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center p-6">Loading...</p>
          ) : error ? (
            <p className="text-center p-6 text-red-500">{error}</p>
          ) : employees.length > 0 ? (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">Employee ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Position</th>
                  <th className="px-6 py-3">Branch</th>
                  <th className="px-6 py-3">Hire Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {employees.map((employee) => (
                  <tr key={employee.EmployeeID}>
                    <td className="px-6 py-4 font-mono">{employee.EmployeeID}</td>
                    <td className="px-6 py-4">{employee.FirstName} {employee.LastName}</td>
                    <td className="px-6 py-4">{employee.Position}</td>
                    <td className="px-6 py-4">{employee.BranchName} ({employee.BranchID})</td>
                    <td className="px-6 py-4">{new Date(employee.HireDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center p-6 text-gray-500">No employees found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowEmployees;
