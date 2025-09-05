import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUserCheck } from 'react-icons/fi';

const UpdateAccount = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const CustomerID = localStorage.getItem('CustomerID');
  const navigate = useNavigate();

  useEffect(() => {
    if (CustomerID) {
      setLoading(true);
      axios.get(`https://my-sql-bank-management-system-01.onrender.com/api/v1/customers/get/${CustomerID}`)
        .then((response) => {
          const customer = response.data.data;
          setInitialData(customer);
          // Pre-fill the form with existing data
          Object.keys(customer).forEach((key) => {
            setValue(key, customer[key]);
          });
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
          alert("Failed to load customer data.");
        })
        .finally(() => setLoading(false));
    }
  }, [CustomerID, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://my-sql-bank-management-system-01.onrender.com/api/v1/customers/update/${CustomerID}`,
        data
      );
      alert("Account updated successfully!");
      navigate("/customer-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return <div className="min-h-screen flex items-center justify-center">Loading your details...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiUserCheck className="mx-auto text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Update Your Account</h1>
          <p className="text-gray-500">Modify your personal details below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="FirstName" className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="FirstName"
              {...register("FirstName", { required: "First Name is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
            {errors.FirstName && <p className="text-red-500 text-xs mt-1">{errors.FirstName.message}</p>}
          </div>

          <div>
            <label htmlFor="LastName" className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="LastName"
              {...register("LastName", { required: "Last Name is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
            {errors.LastName && <p className="text-red-500 text-xs mt-1">{errors.LastName.message}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="Address" className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="Address"
              {...register("Address")}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="Email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="Email"
              {...register("Email", { required: "Email is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
            {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>}
          </div>

          <div>
            <label htmlFor="Phone" className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="Phone"
              {...register("Phone")}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? "Updating..." : "Update Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;