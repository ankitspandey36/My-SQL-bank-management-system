import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLogIn } from 'react-icons/fi';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5010/api/v1/auth/login', data);

      if (response.data.success) {
        const { token, customer } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('CustomerID', customer.id);

        alert('Login successful!');
        navigate('/customer-dashboard');
      } else {
        setErrorMessage(response.data.message || 'Invalid Customer ID or Password.');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred during login.';
      setErrorMessage(errorMsg);
      console.error('Login error:', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiLogIn className="mx-auto text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Customer Login</h1>
          <p className="text-gray-500">Welcome back, please enter your credentials.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="CustomerID" className="text-sm font-medium text-gray-700">
              Customer ID
            </label>
            <input
              type="text"
              id="CustomerID"
              {...register('CustomerID', { required: 'Customer ID is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your Customer ID"
            />
            {errors.CustomerID && <p className="text-red-500 text-xs mt-1">{errors.CustomerID.message}</p>}
          </div>

          <div>
            <label htmlFor="Password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="Password"
              {...register('Password', { required: 'Password is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your password"
            />
            {errors.Password && <p className="text-red-500 text-xs mt-1">{errors.Password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup/customer')}
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
