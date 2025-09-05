import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post("https://my-sql-bank-management-system-01.onrender.com/api/v1/admin/login", data);
      if (response.data.success) {
        alert("Login successful!");
        navigate("/admindashboard");
      } else {
        setErrorMessage(response.data.message || "Login failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred during login";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600">Welcome back, please enter your credentials.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="Username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="Username"
              {...register("Username", { required: "Username is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your username"
            />
            {errors.Username && <p className="text-red-500 text-xs mt-1">{errors.Username.message}</p>}
          </div>

          <div>
            <label htmlFor="Password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="Password"
              {...register("Password", { required: "Password is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your password"
            />
            {errors.Password && <p className="text-red-500 text-xs mt-1">{errors.Password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
