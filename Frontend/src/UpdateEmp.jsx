import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

const UpdateEmployee = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.put(
        `https://my-sql-bank-management-system-01.onrender.com/api/v1/employees/update/${data.EmployeeID}`,
        data
      );
      alert(response.data.message);
      reset();
      navigate('/admindashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error updating employee';
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiEdit className="mx-auto text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Update Employee Details</h1>
          <p className="text-gray-500">Enter the Employee ID and the fields you wish to modify.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="EmployeeID" className="text-sm font-medium text-gray-700">Employee ID to Update</label>
            <input
              type="text"
              id="EmployeeID"
              {...register('EmployeeID', { required: 'Employee ID is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Employee ID"
            />
            {errors.EmployeeID && <p className="text-red-500 text-xs mt-1">{errors.EmployeeID.message}</p>}
          </div>

          <div>
            <label htmlFor="FirstName" className="text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="FirstName" {...register('FirstName')} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label htmlFor="LastName" className="text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="LastName" {...register('LastName')} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label htmlFor="Position" className="text-sm font-medium text-gray-700">Position</label>
            <input type="text" id="Position" {...register('Position')} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label htmlFor="Salary" className="text-sm font-medium text-gray-700">Salary</label>
            <input type="number" id="Salary" step="0.01" {...register('Salary')} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="BranchID" className="text-sm font-medium text-gray-700">Branch ID</label>
            <input type="number" id="BranchID" {...register('BranchID')} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Updating...' : 'Update Employee'}
            </button>
          </div>
        </form>

        {errorMessage && <p className="mt-4 text-red-500 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UpdateEmployee;