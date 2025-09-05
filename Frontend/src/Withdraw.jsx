import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiTrendingDown } from 'react-icons/fi';

const Withdraw = () => {
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
        "http://localhost:5010/api/v1/accountcards/withdrawl",
        data
      );
      alert(response.data.message);
      reset();
      navigate("/customer-dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred during withdrawal.";
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
          <FiTrendingDown className="mx-auto text-4xl text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Withdraw Funds</h1>
          <p className="text-gray-500">Securely withdraw money from your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="CustomerID" className="text-sm font-medium text-gray-700">Customer ID</label>
            <input
              type="text"
              id="CustomerID"
              {...register("CustomerID", { required: "Customer ID is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your Customer ID"
            />
            {errors.CustomerID && <p className="text-red-500 text-xs mt-1">{errors.CustomerID.message}</p>}
          </div>

          <div>
            <label htmlFor="CardType" className="text-sm font-medium text-gray-700">Card Type</label>
            <select
              id="CardType"
              {...register("CardType", { required: "Card Type is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              <option value="">-- Select Card Type --</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            {errors.CardType && <p className="text-red-500 text-xs mt-1">{errors.CardType.message}</p>}
          </div>

          <div>
            <label htmlFor="PIN" className="text-sm font-medium text-gray-700">Card PIN</label>
            <input
              type="password"
              id="PIN"
              maxLength="4"
              {...register("PIN", { required: "PIN is required", minLength: 4, maxLength: 4 })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter 4-digit PIN"
            />
            {errors.PIN && <p className="text-red-500 text-xs mt-1">PIN must be 4 digits</p>}
          </div>
          
          <div>
            <label htmlFor="Amount" className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="Amount"
              step="0.01"
              {...register("Amount", { required: "Amount is required", min: { value: 1, message: "Amount must be positive" } })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter amount to withdraw"
            />
            {errors.Amount && <p className="text-red-500 text-xs mt-1">{errors.Amount.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300"
          >
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Withdraw;