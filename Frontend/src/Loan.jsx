import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const Loan = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5010/api/v1/loans/create', data);

      if (response.data.success) {
        alert('Loan application submitted successfully!');
        reset();
        navigate('/customer-dashboard');
      } else {
        setErrorMessage(response.data.message || 'Failed to submit loan application.');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
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
          <FiCheckCircle className="mx-auto text-4xl text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Apply for a Loan</h1>
          <p className="text-gray-500">Please provide your details to begin your application.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="CustomerID" className="text-sm font-medium text-gray-700">
              Customer ID
            </label>
            <input
              type="text"
              id="CustomerID"
              {...register("CustomerID", { required: "Customer ID is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Customer ID"
            />
            {errors.CustomerID && (
              <p className="text-red-500 text-xs mt-1">{errors.CustomerID.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="LoanType" className="text-sm font-medium text-gray-700">
              Loan Type
            </label>
            <select
              id="LoanType"
              {...register("LoanType", { required: "Loan Type is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">-- Select Loan Type --</option>
              <option value="Personal">Personal Loan</option>
              <option value="Home">Home Loan</option>
              <option value="Car">Car Loan</option>
              <option value="Education">Education Loan</option>
            </select>
            {errors.LoanType && <p className="text-red-500 text-xs mt-1">{errors.LoanType.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Processing...' : 'Apply Now'}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Loan;
