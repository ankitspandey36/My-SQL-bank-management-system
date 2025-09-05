import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const DeleteEmployee = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ EmployeeID }) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete employee ${EmployeeID}? This is irreversible.`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:5010/api/v1/employees/delete/${EmployeeID}`);
      alert(response.data.message);
      setErrorMessage('');
      reset();
      navigate('/admindashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error deleting employee';
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiTrash2 className="mx-auto text-4xl text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Delete Employee</h1>
          <p className="text-gray-500">Enter the ID to permanently delete an employee.</p>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            <strong>Warning:</strong> This action is irreversible and will remove the employee's record.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="EmployeeID" className="text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              id="EmployeeID"
              {...register("EmployeeID", { required: "Employee ID is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter Employee ID (e.g., E101)"
            />
            {errors.EmployeeID && <p className="text-red-500 text-xs mt-1">{errors.EmployeeID.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300"
          >
            {loading ? 'Deleting...' : 'Delete Employee'}
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default DeleteEmployee;
