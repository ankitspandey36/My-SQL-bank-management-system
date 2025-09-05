import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiDollarSign } from 'react-icons/fi';

const DepositForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post(
        "https://my-sql-bank-management-system-01.onrender.com/api/v1/accountcards/deposit",
        data
      );

      alert(response.data.message);
      reset();
      navigate("/customer-dashboard");

    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred during the deposit.";
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
          <FiDollarSign className="mx-auto text-4xl text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Deposit Money</h1>
          <p className="text-gray-500">Securely add funds to your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer ID Field */}
          <div>
            <label htmlFor="CustomerID" className="text-sm font-medium text-gray-700">
              Customer ID
            </label>
            <input
              type="text"
              id="CustomerID"
              {...register("CustomerID", { required: "Customer ID is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your Customer ID"
            />
            {errors.CustomerID && (
              <p className="text-red-500 text-xs mt-1">{errors.CustomerID.message}</p>
            )}
          </div>

          {/* Card Type Field */}
          <div>
            <label htmlFor="CardType" className="text-sm font-medium text-gray-700">
              Card Type
            </label>
            <select
              id="CardType"
              {...register("CardType", { required: "Card Type is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="">-- Select Card Type --</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            {errors.CardType && <p className="text-red-500 text-xs mt-1">{errors.CardType.message}</p>}
          </div>

          {/* PIN Field */}
          <div>
            <label htmlFor="PIN" className="text-sm font-medium text-gray-700">
              Card PIN
            </label>
            <input
              type="password"
              id="PIN"
              maxLength="4"
              {...register("PIN", {
                required: "PIN is required",
                minLength: { value: 4, message: "PIN must be 4 digits" },
                maxLength: { value: 4, message: "PIN must be 4 digits" },
              })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your 4-digit PIN"
            />
            {errors.PIN && <p className="text-red-500 text-xs mt-1">{errors.PIN.message}</p>}
          </div>
          
          {/* Amount Field */}
          <div>
            <label htmlFor="Amount" className="text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="Amount"
              step="0.01"
              {...register("Amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than zero" },
              })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., 5000"
            />
            {errors.Amount && <p className="text-red-500 text-xs mt-1">{errors.Amount.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300"
          >
            {loading ? 'Processing...' : 'Deposit'}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default DepositForm;
