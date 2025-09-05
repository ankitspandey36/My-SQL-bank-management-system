import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'

const ReportProblem = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    setErrorMessage('')
    try {
      // TODO: Replace with actual API request
      console.log("Problem Reported:", data)
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('Your query has been submitted successfully!')
      reset()
      navigate('/customer-dashboard')
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred. Please try again."
      setErrorMessage(errorMsg)
      alert(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FiAlertCircle className="mx-auto text-4xl text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Report a Problem</h1>
          <p className="text-gray-500">Describe the issue you're facing, and we'll get back to you.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="CustomerID" className="text-sm font-medium text-gray-700">Your Customer ID</label>
            <input
              type="text"
              id="CustomerID"
              placeholder="Enter your Customer ID"
              {...register("CustomerID", { required: "Customer ID is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
            {errors.CustomerID && <p className="text-red-500 text-xs mt-1">{errors.CustomerID.message}</p>}
          </div>

          <div>
            <label htmlFor="QueryType" className="text-sm font-medium text-gray-700">Type of Issue</label>
            <select
              id="QueryType"
              {...register("QueryType", { required: "Please select a query type" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg bg-white"
            >
              <option value="">Select an issue type...</option>
              <option value="Transaction Issue">Transaction Issue</option>
              <option value="Card Issue">Card Issue</option>
              <option value="Account Access">Account Access</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>
            {errors.QueryType && <p className="text-red-500 text-xs mt-1">{errors.QueryType.message}</p>}
          </div>

          <div>
            <label htmlFor="Description" className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="Description"
              rows="5"
              placeholder="Please describe the problem in detail..."
              {...register("Description", { required: "A detailed description is required" })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
            {errors.Description && <p className="text-red-500 text-xs mt-1">{errors.Description.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Submitting...' : 'Submit Query'}
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  )
}

export default ReportProblem
