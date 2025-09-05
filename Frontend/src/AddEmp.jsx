import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const employeeData = {
      ...data,
      Email: `${data.FirstName.toLowerCase()}.${data.LastName.toLowerCase()}@nationalbank.com`,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "https://my-sql-bank-management-system-01.onrender.com/api/v1/employees/create",
        employeeData
      );
      alert(response.data.message);
      reset();
      setErrorMessage('');
      navigate("/admindashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error adding employee";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Add New Employee</h1>
          <p className="text-gray-600">Please fill in the employee's details.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: "EmployeeID", label: "Employee ID", type: "text", placeholder: "e.g., E101" },
            { id: "BranchID", label: "Branch ID", type: "number", placeholder: "e.g., 101" },
            { id: "FirstName", label: "First Name", type: "text", placeholder: "e.g., Priya" },
            { id: "LastName", label: "Last Name", type: "text", placeholder: "e.g., Singh" },
            { id: "Position", label: "Position", type: "text", placeholder: "e.g., Branch Manager" },
            { id: "Salary", label: "Salary", type: "number", placeholder: "e.g., 85000" },
          ].map((field, i) => (
            <div key={i}>
              <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                step={field.id === "Salary" ? "0.01" : undefined}
                placeholder={field.placeholder}
                {...register(field.id, { required: `${field.label} is required` })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors[field.id] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.id].message}</p>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label htmlFor="HireDate" className="text-sm font-medium text-gray-700">Hire Date</label>
            <input
              type="date"
              id="HireDate"
              {...register("HireDate", { required: "Hire date is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.HireDate && <p className="text-red-500 text-xs mt-1">{errors.HireDate.message}</p>}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
          </div>
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

export default AddEmployee;
