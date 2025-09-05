import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSend } from 'react-icons/fi';

const CreateTransaction = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5010/api/v1/transactions/create",
        data
      );
      alert("Transaction successful!");
      reset();
      navigate("/customer-dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred during the transaction.";
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiSend className="mx-auto text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Send Money</h1>
          <p className="text-gray-500">Securely transfer funds to another account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="AccountID" className="text-sm font-medium text-gray-700">Your Account ID</label>
            <input
              type="text"
              id="AccountID"
              {...register("AccountID", { required: "Your Account ID is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="The account to send from"
            />
            {errors.AccountID && <p className="text-red-500 text-xs mt-1">{errors.AccountID.message}</p>}
          </div>

          <div>
            <label htmlFor="ReceiverID" className="text-sm font-medium text-gray-700">Receiver's Account ID</label>
            <input
              type="text"
              id="ReceiverID"
              {...register("ReceiverID", { required: "Receiver ID is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="The account to send to"
            />
            {errors.ReceiverID && <p className="text-red-500 text-xs mt-1">{errors.ReceiverID.message}</p>}
          </div>

          <div>
            <label htmlFor="Amount" className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="Amount"
              step="0.01"
              {...register("Amount", { required: "Amount is required", min: { value: 1, message: "Amount must be positive" } })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="e.g., 1000"
            />
            {errors.Amount && <p className="text-red-500 text-xs mt-1">{errors.Amount.message}</p>}
          </div>

          <div>
            <label htmlFor="PIN" className="text-sm font-medium text-gray-700">Your Card PIN</label>
            <input
              type="password"
              id="PIN"
              maxLength="4"
              {...register("PIN", { required: "PIN is required", minLength: 4, maxLength: 4 })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="Enter 4-digit PIN to authorize"
            />
            {errors.PIN && <p className="text-red-500 text-xs mt-1">PIN must be 4 digits</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? "Processing..." : "Send Money"}
          </button>
        </form>
        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CreateTransaction;