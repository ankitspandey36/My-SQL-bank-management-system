import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUserPlus } from 'react-icons/fi';

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      await axios.post('https://my-sql-bank-management-system-01.onrender.com/api/v1/customers/create', data);
      await axios.post('https://my-sql-bank-management-system-01.onrender.com/api/v1/accounts/create', {
        CustomerID: data.CustomerID,
        AccountType: data.AccountType,
      });
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Signup failed.';
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <FiUserPlus className="mx-auto text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Create Your Account</h1>
          <p className="text-gray-500">Join us and manage your finances with ease.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'CustomerID', label: 'Customer ID', type: 'text', placeholder: 'Unique ID' },
            { name: 'BranchID', label: 'Branch ID', type: 'number', placeholder: 'Enter Branch ID' },
            { name: 'FirstName', label: 'First Name', type: 'text', placeholder: 'e.g., Ankit' },
            { name: 'LastName', label: 'Last Name', type: 'text', placeholder: 'e.g., Kumar' },
            { name: 'Email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { name: 'Phone', label: 'Phone', type: 'tel', placeholder: '10-digit number' },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, { required: `${field.label} is required` })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name].message}</p>}
            </div>
          ))}

          {/* Address full row */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Your full address"
              {...register('Address', { required: 'Address is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
            {errors.Address && <p className="text-red-500 text-xs mt-1">{errors.Address.message}</p>}
          </div>

          {/* Account Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">Account Type</label>
            <select
              {...register('AccountType', { required: 'Account type is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg bg-white"
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              {...register('Password', { required: 'Password is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
            {errors.Password && <p className="text-red-500 text-xs mt-1">{errors.Password.message}</p>}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
