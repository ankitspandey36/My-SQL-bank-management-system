import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiCreditCard } from 'react-icons/fi';

const RequestATM = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5010/api/v1/accountcards/create', data);
      alert(response.data.message || 'ATM Card requested successfully!');
      reset();
      navigate('/customer-dashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <FiCreditCard className="mx-auto text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Request New Card</h1>
          <p className="text-gray-500">Fill in the details to receive a new ATM/Debit card.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="AccountID" className="text-sm font-medium text-gray-700">Account ID</label>
            <input
              id="AccountID"
              {...register('AccountID', { required: 'Account ID is required' })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your Account ID"
            />
            {errors.AccountID && <p className="text-red-500 text-xs mt-1">{errors.AccountID.message}</p>}
          </div>

          <div>
            <label htmlFor="CardType" className="text-sm font-medium text-gray-700">Card Type</label>
            <select
              id="CardType"
              {...register('CardType', { required: 'Card type is required' })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="">Select Card Type</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
            {errors.CardType && <p className="text-red-500 text-xs mt-1">{errors.CardType.message}</p>}
          </div>

          <div>
            <label htmlFor="PIN" className="text-sm font-medium text-gray-700">Set a 4-Digit PIN</label>
            <input
              type="password"
              id="PIN"
              {...register('PIN', {
                required: 'PIN is required',
                pattern: { value: /^\d{4}$/, message: 'PIN must be exactly 4 digits' }
              })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter a new 4-digit PIN"
            />
            {errors.PIN && <p className="text-red-500 text-xs mt-1">{errors.PIN.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Processing...' : 'Request Card'}
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RequestATM;
